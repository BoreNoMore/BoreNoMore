---
title: Device Module
sidebar_position: 1
---

The module is responsible for receiving packets from Brain-Computer Interface. It contains two Scriptable Objects: DeviceConfig and DeviceManager. 

---

### Device

`Device` is a `ScriptableObject` that provides a blueprint for defining the structure of a BCI device and the format of the data it transmits.

#### Properties:

1. **name: string**
   - **Description**: The name of the BCI device.
   - **Type**: `string`
   - **Usage**: A user-friendly name for the device, used for display and identification.

2. **dataColumns: `List<string>`**
   - **Description**: An ordered list of channel names corresponding to the channel IDs received from the device.
   - **Type**: `List<string>`
   - **Usage**: This list defines the names of the data channels in the order they are transmitted. The index of each name in the list matches the channel ID received from the device.

---

### DeviceConfig

`DeviceConfig` is a `ScriptableObject` that defines configuration parameters for a specific BCI device. It provides settings for connecting to the device, handling data streams, and specifying the format in which data is transmitted.

#### Properties:

1. **selectedDevice: Device**
   - **Description**: The specific BCI device to be configured.
   - **Type**: `Device`
   - **Usage**: This property holds a reference to a `Device` object that specifies the characteristics of the connected BCI device.

2. **Streamer: Istreamer**
   - **Description**: A class selected from the `AvailableStreamers` list, used to handle incoming data streams from the device.
   - **Type**: `Istreamer`
   - **Details**: Developers can choose a class from `AvailableStreamers` to process data streams. If a custom `Istreamer` implementation is needed, developers must ensure their class implements the `Istreamer` interface and add it to `AvailableStreamers`.

3. **ipAddress: string**
   - **Description**: The IP address where the BCI device sends data.
   - **Type**: `string`
   - **Usage**: Specify the IP address to establish a connection with the device.

4. **port: int**
   - **Description**: The port number where data is being transmitted.
   - **Type**: `int`
   - **Usage**: Specify the port to read data from.

5. **connectionTimeout: int**
   - **Description**: The duration in seconds to wait before timing out a connection attempt.
   - **Type**: `int`
   - **Usage**: Defines the maximum time to wait for a connection before failure.

6. **Format: enum**
   - **Description**: The encoding format used for the transmitted data.
   - **Type**: `enum`
   - **Values**:
     - `Ascii`: Data is encoded using ASCII format.
     - `utf-8`: Data is encoded using UTF-8 format.
   - **Usage**: Choose the appropriate data encoding format.

7. **delimeter: string**
   - **Description**: The character(s) used to delimit data fields in the incoming data stream.
   - **Type**: `string`
   - **Usage**: Specify the delimiter used to separate data values.


---

### Builtin Streamers
- `UDPStreamer` - Streamer for UDP connection, tested with Unicorn Hybrid Black.

