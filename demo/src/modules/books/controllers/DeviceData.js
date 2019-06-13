import { connect } from "@xbyorange/react-mercury";

import { mediaQueryFiltered, deviceDataFiltered } from "../../../data/media-query";

import { default as DeviceDataComponent } from "../../../components/device-data";

export const mapDataSourceToProps = () => ({
  deviceFilter: mediaQueryFiltered.read,
  deviceDataFiltered: deviceDataFiltered.read
});

export const DeviceData = connect(mapDataSourceToProps)(DeviceDataComponent);
