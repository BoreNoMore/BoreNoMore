---
title: Classifier Module
sidebar_position: 3
---

# Classifier Module

The Classifier module is responsible for analyzing preprocessed data and generating predictions based on trained neural network models. It acts as the final stage in the data pipeline, ensuring that incoming data is evaluated against the appropriate classifier configurations to deliver actionable results. This module supports flexibility through dynamic runtime selection and model integration, streamlining the prediction process and enabling seamless interaction with the broader data handling workflow.

## ClassifiersDict

This class manages a dictionary of `ClassifierRecord` instances, enabling serialization and deserialization of classifier configurations. It ensures that classifier names are unique and properly initialized, facilitating efficient management of classifiers within the module.

### Key Components and Methods

- **values**  
  A serialized list of `ClassifierRecord` instances. Used to persist the dictionary data across serialization cycles.

- **NEW_CLASSIFIER_NAME**  
  A constant string used as a default name for new classifiers when no name is provided or when conflicts occur.

- **OnBeforeSerialize()**  
  Clears the `values` list and repopulates it with the `ClassifierRecord` instances from the dictionary. Ensures the dictionary's contents are correctly serialized.

- **OnAfterDeserialize()**  
  Rebuilds the dictionary from the serialized `values` list. It resolves naming conflicts by appending unique identifiers to duplicate names.

---

## ClassifierRecord

Represents an individual classifier's configuration, including its runtime, neural network model, and output settings. This class serves as a lightweight container for essential classifier data and methods.

### Key Components and Methods

- **name**  
  A string representing the unique identifier for the classifier.

- **runtime**  
  An instance of `IRuntime` that handles the execution of the neural network model.

- **model**  
  The neural network model (`NNModel`) associated with the classifier.

- **outputNames**  
  An array of strings defining the names of the output variables produced by the classifier.

- **Load(IRuntime runtime)**  
  Assigns the provided runtime to the classifier and loads the neural network model into it. This method prepares the classifier for prediction tasks.

---

## ClassifierManager

The `ClassifierManager` class orchestrates the classifier operations, including loading configurations, binding event handlers, and managing data classification workflows. It ensures smooth integration of classifier logic into the broader data pipeline.

### Key Components and Methods

- **Private Fields**
  - **_dataPreprocessedBinding**  
    An event binding for handling `DataPreprocessedEvent`, which triggers classification when new preprocessed data is available.
  - **_config**  
    An instance of `ClassifierConfig` containing the configuration details for the classifiers.

- **Private Methods**
  - **_receiveData(DataPreprocessedEvent busEvent)**  
    Handles incoming preprocessed data by identifying the appropriate classifier and invoking its `Predict` method. It logs errors for missing classifiers and sends the classified results to the event bus.
  - **_sendData(DataClassifiedEvent busEvent)**  
    Raises a `DataClassifiedEvent` on the event bus with the classifier's prediction results.

- **Public Methods**
  - **Load(IConfig config)**  
    Loads classifier configurations from the provided `IConfig` object. Dynamically instantiates the runtime for each classifier and prepares it for prediction.
  - **Init()**  
    Initializes event bindings for `DataPreprocessedEvent` and registers them with the event bus.
  - **Bind()**  
    A placeholder method for additional binding logic if required in the future.


## AvailableRuntimes

The `AvailableRuntimes` class provides a centralized registry of available runtime types for classifiers. It enables dynamic selection and instantiation of runtime environments for executing neural network models.

### Key Components and Methods

- **Runtimes**  
  A static, read-only array of `Type` objects representing the available runtime implementations. Currently, the supported runtimes include:
  - `OnnxRuntime`
  - `TFRuntime`

---

## IRuntime

The `IRuntime` interface defines the contract for implementing runtime environments capable of executing neural network models. It serves as a foundation for integrating various runtime backends into the classifier module.

### Key Components and Methods

- **Predict(Matrix data)**  
  Processes the input data (`Matrix`) and returns a prediction as a `Matrix` object.

- **Load(NNModel model)**  
  Loads a neural network model (`NNModel`) into the runtime environment, preparing it for prediction tasks.

---

## OnnxRuntime

The `OnnxRuntime` class implements the `IRuntime` interface and leverages Unity Barracuda to execute ONNX (Open Neural Network Exchange) models. It provides efficient inference capabilities and supports precompiled workers for enhanced performance.

### Key Components and Methods

- **Private Fields**
  - **_model**  
    Stores the loaded ONNX model.
  - **_worker**  
    An instance of `IWorker`, responsible for executing the loaded model.

- **Public Methods**
  - **Load(NNModel model)**  
    Loads an ONNX model into the runtime by initializing the `_model` and creating a `Worker` instance for inference. Logs the loading process for debugging purposes.
  - **Predict(Matrix data)**  
    Executes the model on the provided `Matrix` input. The method prepares the input tensor, executes the model, and retrieves the output tensor. It updates the input `Matrix` with the predictions and logs the results.
  - **~OnnxRuntime()**  
    A destructor that ensures proper disposal of the `_worker` to free resources.

---

## TFRuntime

The `TFRuntime` class is a placeholder implementation of the `IRuntime` interface for TensorFlow models. It is intended for future support of TensorFlow inference within the classifier module.

### Key Components and Methods

- **Public Methods**
  - **Predict(Matrix data)**  
    Throws a `NotImplementedException` as the functionality is not yet implemented.
  - **Load(NNModel model)**  
    Throws a `NotImplementedException` as the functionality is not yet implemented.



