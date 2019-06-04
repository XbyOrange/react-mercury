import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { isEqual } from "lodash";

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

      getSourcesProps() {
        this.sourceProps = mapSourcesToProps(this.props);
        this.sourcePropsKeys = Object.keys(this.sourceProps);
        // Define getters
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.sourceProps[sourceKey] && this.sourceProps[sourceKey].isGetter) {
            this.sourcePropsGetters[sourceKey] = this.sourceProps[sourceKey].prop;
            this.sourceProps[sourceKey] = this.sourceProps[sourceKey]._method;
          }
        });
      }

      getSourcesPropsValues() {
        const sourcesProps = {};
        this.sourcePropsKeys.forEach(sourceKey => {
          sourcesProps[sourceKey] =
            this.sourceProps[sourceKey] && this.sourceProps[sourceKey]._isSourceMethod
              ? this.cleanSourceProps(
                  this.sourceProps[sourceKey],
                  this.sourcePropsGetters[sourceKey]
                )
              : this.sourceProps[sourceKey];
        });
        return sourcesProps;
      }

      updateState() {
        this.setState({
          sourceProps: this.getSourcesPropsValues()
        });
      }

      logError(id, message) {
        console.error(`Error "${message}" in ${id}`);
      }

      dispatchAllReads() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (
            this.sourceProps[sourceKey] &&
            this.sourceProps[sourceKey]._methodName === READ_METHOD
          ) {
            this.sourceProps[sourceKey].dispatch().catch(error => {
              this.logError(this.sourceProps[sourceKey]._source._id, error.message);
            });
          }
        });
      }

      addSourceListeners() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.sourceProps[sourceKey] && this.sourceProps[sourceKey]._isSourceMethod) {
            this.sourcePropsReaders[sourceKey] = () => {
              if (this.sourceProps[sourceKey]._methodName === READ_METHOD) {
                this.sourceProps[sourceKey]._source.read.dispatch().catch(error => {
                  this.logError(this.sourceProps[sourceKey]._source._id, error.message);
                });
              }
            };

            this.sourcePropsListeners[sourceKey] = methodName => {
              if (methodName === this.sourceProps[sourceKey]._methodName) {
                if (!this._unmounted) {
                  this.updateState();
                }
              }
            };

            this.sourceProps[sourceKey]._source.onClean(this.sourcePropsReaders[sourceKey]);

            this.sourceProps[sourceKey]._source.onChange(this.sourcePropsListeners[sourceKey]);
          }
        });
      }

      removeSourceListeners() {
        this.sourcePropsKeys.forEach(sourceKey => {
          if (this.sourceProps[sourceKey] && this.sourceProps[sourceKey]._isSourceMethod) {
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

    MercuryConnectedComponent.displayName = `MercuryConnectedComponent(${getDisplayName(
      WrappedComponent
    )})`;

    hoistNonReactStatics(MercuryConnectedComponent, WrappedComponent);

    return MercuryConnectedComponent;
  };
};
