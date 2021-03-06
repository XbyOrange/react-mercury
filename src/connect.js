import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { isEqual } from "lodash";
import { ServerSideDataContext } from "./ServerSideDataContext";

const READ_METHOD = "read";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const connect = (mapSourcesToProps, parseProps) => {
  return WrappedComponent => {
    class MercuryConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this._unmounted = false;
        this.sourcePropsListeners = {};
        this.sourcePropsReaders = {};
        this.sourcePropsKeys = [];
        this.sourcePropsGetters = {};
        this.sourcePropsIds = {};
        this.sourcePropsLoaded = {};
        this.getSourcesProps();
        this.state = {
          sourceProps: this.getSourcesPropsValues()
        };
      }

      componentDidMount() {
        this.resetSources();
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
          this.resetSources();
        }
      }

      componentWillUnmount() {
        this._unmounted = true;
        this.removeSourceListeners();
      }

      resetSources() {
        this.removeSourceListeners();
        this.getSourcesProps();
        this.updateState();
        this.addSourceListeners();
        this.dispatchAllReads();
      }

      cleanSourceProps(sourceProps, propName) {
        const dispatch = data =>
          sourceProps.dispatch(data).catch(error => {
            this.logError(sourceProps._source._id, error.message);
          });
        if (!propName) {
          return {
            dispatch,
            error: sourceProps.error,
            loading: sourceProps.loading,
            value: sourceProps.value
          };
        }
        return sourceProps[propName];
      }

      isMercurySource(prop) {
        return prop && prop._isSourceMethod;
      }

      getSourcesProps() {
        this.sourceProps = mapSourcesToProps(this.props);
        this.sourcePropsKeys = Object.keys(this.sourceProps);

        // Define getters
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.sourceProps[sourceKey] && this.sourceProps[sourceKey].isGetter) {
            this.sourcePropsGetters[sourceKey] = this.sourceProps[sourceKey].prop;
            this.sourceProps[sourceKey] = this.sourceProps[sourceKey]._method;
          }
          if (this.isMercurySource(this.sourceProps[sourceKey])) {
            this.sourcePropsIds[sourceKey] = this.sourceProps[sourceKey]._source._id;
          }
        });
      }

      getSourcesPropsValues() {
        const sourcesProps = {};
        this.sourcePropsKeys.forEach(sourceKey => {
          if (
            this.context &&
            this.context.data &&
            this.context.data[this.sourcePropsIds[sourceKey]] &&
            !this.sourcePropsLoaded[sourceKey]
          ) {
            sourcesProps[sourceKey] = this.cleanSourceProps(
              {
                loading: false,
                error: null,
                value: this.context.data[this.sourcePropsIds[sourceKey]]
              },
              this.sourcePropsGetters[sourceKey]
            );
          } else {
            sourcesProps[sourceKey] = this.isMercurySource(this.sourceProps[sourceKey])
              ? this.cleanSourceProps(
                  this.sourceProps[sourceKey],
                  this.sourcePropsGetters[sourceKey]
                )
              : this.sourceProps[sourceKey];
          }
        });
        return sourcesProps;
      }

      updateState() {
        if (!this._unmounted) {
          this.setState({
            sourceProps: this.getSourcesPropsValues()
          });
        }
      }

      logError(id, message) {
        console.error(`Error "${message}" in ${id}`);
      }

      markSourceAsLoaded(sourceKey) {
        // TODO, remove this when Mercury provides info about if source has been loaded.
        this.sourcePropsLoaded[sourceKey] = true;
        this.updateState();
      }

      dispatchRead(source, sourceKey) {
        if (
          this.context &&
          (this.context.clientSide ||
            !this.context.data ||
            !this.context.data[this.sourcePropsIds[sourceKey]])
        ) {
          return source
            .dispatch()
            .catch(error => {
              this.logError(this.sourceProps[sourceKey]._source._id, error.message);
              this.markSourceAsLoaded(sourceKey);
            })
            .then(() => {
              this.markSourceAsLoaded(sourceKey);
            });
        }
      }

      dispatchAllReads() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (
            this.sourceProps[sourceKey] &&
            this.sourceProps[sourceKey]._methodName === READ_METHOD
          ) {
            this.dispatchRead(this.sourceProps[sourceKey], sourceKey);
          }
        });
      }

      addSourceListeners() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.isMercurySource(this.sourceProps[sourceKey])) {
            this.sourcePropsReaders[sourceKey] = () => {
              if (this.sourceProps[sourceKey]._methodName === READ_METHOD) {
                // TODO, why here source is accessed through "_source.read" and in dispatchAllRead is done through the main object?
                this.dispatchRead(this.sourceProps[sourceKey]._source.read, sourceKey);
              }
            };

            this.sourcePropsListeners[sourceKey] = methodName => {
              if (methodName === this.sourceProps[sourceKey]._methodName) {
                this.updateState();
              }
            };

            this.sourceProps[sourceKey]._source.onClean(this.sourcePropsReaders[sourceKey]);

            this.sourceProps[sourceKey]._source.onChange(this.sourcePropsListeners[sourceKey]);
          }
        });
      }

      removeSourceListeners() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.isMercurySource(this.sourceProps[sourceKey])) {
            this.sourceProps[sourceKey]._source.removeCleanListener(
              this.sourcePropsReaders[sourceKey]
            );
            this.sourceProps[sourceKey]._source.removeChangeListener(
              this.sourcePropsListeners[sourceKey]
            );
          }
        });
      }

      render() {
        let props = {
          ...this.props,
          ...this.state.sourceProps
        };
        if (parseProps) {
          props = parseProps(props);
        }

        return <WrappedComponent {...props} />;
      }
    }

    MercuryConnectedComponent.contextType = ServerSideDataContext;

    MercuryConnectedComponent.displayName = `MercuryConnectedComponent(${getDisplayName(
      WrappedComponent
    )})`;

    hoistNonReactStatics(MercuryConnectedComponent, WrappedComponent);

    return MercuryConnectedComponent;
  };
};
