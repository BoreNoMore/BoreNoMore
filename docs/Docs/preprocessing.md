---
title: Preprocessing Module
sidebar_position: 2
---

The Preprocessing module serves as the initial stage in the data handling workflow, dedicated to preparing raw data for further analysis and processing within the Classifier module. Its primary functions include filtering, cleaning, and transforming the data to ensure it meets the necessary quality and format standards required for accurate classification. Through targeted modifications and adjustments, this module lays the groundwork for a streamlined and efficient transition into the subsequent classification phase, enhancing overall model performance and reliability.

---

### Preprocessing Manager
This class is responsible for managing and executing the preprocessing pipelines defined in PreprocessingConfig.

#### Key Components and Methods

1. **_config**
  - An instance of PreprocessingConfig. It defines the data and parameters needed to initialize and execute later actions in given pipelines.

2. **Load(IConfig config)**
  - This method accepts a configuration object that it casts to PreprocessingConfig. It then iterates through each defined preprocessing pipeline, calling CreateEffects() to initialize and set up the transformations for each pipeline. This setup is necessary before the pipelines can execute any data preprocessing tasks. This is implementeted by using multithreading for more efficient processing.

---

### PreprocessingPipeline
This class is responsible for defining and managing a sequence of preprocessing effects applied to incoming data. It leverages Unity's event-driven architecture to handle and process data as it flows through the pipeline. It also serializes the configuration and dynamically instantiates specific preprocessing effects (PPEffect).

#### Key Components and Methods

1. **ppEffects**
   - A list of PPEffects instances representing effects that will apply to the data.

2. **classifierName**
   - the name of the classifier associated with this pipeline, which determine how data is processed and routed after preprocessing step.

3. **_dataReceivedBinding**
   - field that binds a DataReceivedEvent to the _onDataReceived method, enabling the pipeline to react when new data is received.

4. **PreprocessingPipeline()**
   - Constructor that is responsible to initialize proper binding (_dataReceivedBinding) with a callback (_onDataReceived) to handle incoming data events. I also registers this binding with 'EventBus<DataReceivedEvent>', allowing given pipeline to receive data for preprocessing as it becomes available.

5. **CreateEffects()**
   - Method responsible for instatiating and configurinf each PPEffect in the ppEffects list.
   - It copies the effects into a temporary array, clears the original list, and then reinstantiates each effect.
   - _instantiateEffect() is called for each effect, to create a proper instance of it. Once instantiated, the effect’s base fields are assigned in order to maintain them in configuration.

6. **_instantiateEffect(PPEffect effectConfig)**
   - Helper method that uses reflection to insatntiate effects based on their Effectname. If the type cannot be found error is logged and return null. Otherwise it deserializes and instantiates the effect with specified parameters, returning configured PPEffect instance.
  
7. **_onDataReceived(DataReceivedEvent)**
   - This callback method is invoked when a DataReceivedEvent is triggered. It sets a flag indicating that the pipeline is ready to preprocess data within its thread. Additionally, it stores the received data in a private variable, ensuring it is retained until processing begins.

8. **Update()**
   - In this method, the stored data is processed when the flag indicates readiness. This ensures that data preprocessing only occurs when new data is available and the pipeline is prepared to handle it.

//TODO write explanation about preprocessing process and explain why recursion is used.

---

### PPEffect

The PPEffect class serves as a foundational base class for creating various preprocessing effects within the pipeline. It provides common properties and methods that are essential to defining and configuring individual preprocessing effects, and it facilitates flexibility for custom implementations of data processing in derived classes.

#### Key Components and Methods

1. **outputData**
   - A list of DataColumn objects representing the structured output data produced by applying the effect.

2. **effectName**
   - A private, serialized string that identifies the name of the effect. Each derived effect class can assign its specific name, allowing for easy recognition and debugging of different effects.

3. **kwargs**
   - An instance of Kwargs that provides additional configuration parameters. These parameters enable customization for each effect, making the preprocessing pipeline highly adaptable to various data requirements.

4. **ProcessData()**
   - //TODO after correct and working implementatino finish this

5. **AssignBaseFieldsFrom(PPEffect parent)**
   - This method copies essential fields from a parent PPEffect instance, ensuring that a deserialized or cloned effect inherits the necessary configurations, such as outputData, inputDataColumnStates, effectName, and kwargs. This functionality supports the reusability of effect configurations within the preprocessing pipeline.


#### Derived Classes

The PPEffect class acts as the base for specific preprocessing effects, like:

1. **NotchFilterEffect**
It uses the notch_filter function from mne to remove a specified frequency from the data (for example, to eliminate electrical line noise at 50 Hz). The filter is applied to the raw data in matrix form.
3. **FilterEffect**
It applies a a bandpass filter from mne, restricting data frequencies to a specified range (lowFreq and highFreq). The filter function retains only the signals within the selected frequency range, which is useful for filtering out noise outside of the desired bandwidth.

//TODO should we describe them in details ?

The derived classes use Python to perform complex signal processing operations. By leveraging the Python.Runtime library, these classes integrate with popular Python libraries, such as numpy and mne, to conduct advanced filtering operations directly on the data.
