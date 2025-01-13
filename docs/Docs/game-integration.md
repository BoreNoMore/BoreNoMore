---
title: Game Integration Module
sidebar_position: 4
---


## Game Integration: Event-Based System for Game Functionality Changes


## Condition

The `Condition` class represents a condition that must be met for an event to be triggered. It compares a value against a predefined threshold using various criteria.

### Key Components and Methods

- **criteria**  
  The type of comparison to perform, based on the `Criteria` enum.
  
- **value**  
  The value to compare against.

- **Check(float newValue)**  
  Compares the given `newValue` against the `value` based on the `criteria`. Returns `true` if the condition is met, otherwise `false`.

---

## Enums.Criteria

The `Criteria` enum defines various comparison operations used in the `Condition` class to determine if a condition has been met.

### Enum Values

- **GreaterOrEqual**  
  Checks if a value is greater than or equal to a threshold.
  
- **LessOrEqual**  
  Checks if a value is less than or equal to a threshold.
  
- **Equal**  
  Checks if a value is exactly equal to a threshold.

- **GreaterThan**  
  Checks if a value is greater than a threshold.
  
- **LessThan**  
  Checks if a value is less than a threshold.

---

## Event

The `Event` class represents an event that is triggered based on a condition. It tracks whether the event has been triggered and can handle continuous or cooldown-based triggering.

### Key Components and Methods

- **Name**  
  The name of the event.

- **Condition**  
  The condition associated with the event. The event triggers when this condition is met.

- **isContinous**  
  A flag indicating whether the event can trigger continuously or only once after a cooldown.

- **triggerCooldown**  
  The cooldown period between event triggers (in seconds).

- **Reset()**  
  Resets the event's triggering status, allowing it to trigger again.

- **ConditionMet(float value)**  
  Evaluates whether the condition associated with the event is met based on the given `value`.

- **CanTrigger(float currentTime)**  
  Determines whether the event can be triggered based on the `currentTime`, considering the cooldown and the `isContinous` flag.

---

## EventPackage

The `EventPackage` class holds the data related to a specific event, including its name and current value.

### Key Components and Methods

- **EventName**  
  The name of the event.

- **CurrentValue**  
  The current value associated with the event, typically used to determine if the event’s condition is met.

- **EventPackage(string eventName, float currentValue)**  
  Constructor that initializes the event name and current value.

- **EventPackage(string eventName, float currentValue, T additionalData)**  
  A generic version of the `EventPackage` constructor that also includes additional data associated with the event.

---

## GameManager

The `GameManager` class integrates the event-based system into the game. It manages events, listens for data changes, and triggers events when their conditions are met. It also allows registering and unregistering listeners for specific events.

### Key Components and Methods

- **_gameIntegrationConfig**  
  The configuration that defines the events for game integration.

- **_eventPublisher**  
  A publisher used to trigger events and notify listeners.

- **_events**  
  A dictionary storing events by their name.

- **_listenerActions**  
  A dictionary mapping listeners to actions that will be invoked when their subscribed events are triggered.

- **Bind()**  
  Registers event handlers for the `DataClassifiedEvent`, allowing the game to react to classified data.

- **Init()**  
  Initializes the game manager.

- **Load(IConfig config)**  
  Loads the configuration and initializes the events defined in the configuration.

- **CheckConditions(DataClassifiedEvent dataClassifiedEvent)**  
  A method that checks if conditions for an event are met based on the `DataClassifiedEvent`.

- **CheckConditions(float newValue, string eventName)**  
  Checks if the condition for a specific event is met, and triggers the event if applicable.

- **RegisterListener(string eventName, IGameMListener listener)**  
  Registers a listener to an event. The listener will be notified when the event is triggered.

- **UnregisterListener(string eventName, IGameMListener listener)**  
  Unregisters a listener from an event.

- **TriggerEvent(string eventName, float currentValue)**  
  Triggers an event with a given name and value.

- **TriggerEvent<T>(string eventName, float currentValue, T additionalData)**  
  Triggers a generic event with additional data.

---

## IGameMListener

The `IGameMListener` interface defines a contract for classes that wish to listen for events. Implementers of this interface can define custom reactions to events when they are triggered.

### Key Components and Methods

- **OnEventTriggered(string eventName, EventPackage eventState)**  
  Method that gets called when an event is triggered. The event's name and state are passed as parameters.
