import React from "react";
import PropTypes from "prop-types";
import Loading from "../loading";
import ErrorComponent from "../error";

export class DeviceDataComponent extends React.Component {
  renderTable(results) {
    return (
      <table>
        <tbody>
          {results.map(row => (
            <tr key={row}>
              {row.map(col => (
                <td key={col}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const info = this.props.deviceFilter.value,
      loading = this.props.deviceDataFiltered.loading,
      error = this.props.deviceDataFiltered.error,
      data = this.props.deviceDataFiltered.value;

    return (
      <div className="component">
        <h3>{info.device} Mode</h3>
        {loading ? <Loading /> : error ? <ErrorComponent message={error.message} /> : this.renderTable(data)}
      </div>
    );
  }
}

DeviceDataComponent.defaultProps = {
  deviceFilter: {},
  deviceDataFiltered: {}
};

DeviceDataComponent.propTypes = {
  deviceFilter: PropTypes.object,
  deviceDataFiltered: PropTypes.object
};
