const kafkaBrokers = process.env.KAFKA_BROKER_LIST
console.log('kafka===> ', kafkaBrokers )

module.exports = {
  "notificationMinutes": {
    "resetPeriod": 60,
    "notificationInterval": 3,
    "oscilateEvents": ["NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL"]
  },
  "PORT": 3080,
  "centralLedgerAPI": {
    "adminHost": "localhost",
    "adminPort": 3001,
    "apiHost": "localhost",
    "apiPort": 3000
  },
  "swaggerOptions": {
    "info": {
      "title": "Central notification system API Documentation",
      "description": "Api Documentation for central-notification"
    },
    "expanded": "full"
  },
  "mongo": {
    "uri": "localhost:27017",
    "database": "mojaloop",
    "ruleCollection": "Rule",
    "netDebitCapPositionCollection": "NDCPosition",
    "actionCollection": "Actions",
    "eventCollection": "Events",
    "limitCollection": "Limits",
    "notificationEndpointCollection": "NotificationEndpoints"
  },
  "KAFKA": {
    "TOPIC_TEMPLATES": {
      "NOTIFICATION_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-notification-event",
        "REGEX": "topic-notification-event"
      },
      "GENERAL_TOPIC_TEMPLATE": {
        "TEMPLATE": "topic-{{functionality}}-{{action}}",
        "REGEX": "topic-(.*)-(.*)"
      }
    },
    "CONSUMER": {
      "NOTIFICATION": {
        "EVENT": {
          "config": {
            "options": {
              "mode": 2,
              "batchSize": 1,
              "recursiveTimeout": 100,
              "messageCharset": "utf8",
              "messageAsJSON": true,
              "sync": true,
              "consumeTimeout": 1000
            },
            "rdkafkaConf": {
              "client.id": "cep-con",
              "group.id": "cep-group",
              "metadata.broker.list": kafkaBrokers,
              "socket.blocking.max.ms": 1,
              "fetch.wait.max.ms": 1,
              "fetch.error.backoff.ms": 1,
              "queue.buffering.max.ms": 1,
              "broker.version.fallback": "0.10.1.0",
              "api.version.request": true,
              "enable.auto.commit": false,
              "auto.commit.interval.ms": 200,
              "socket.keepalive.enable": true,
              "socket.max.fails": 1
            },
            "topicConf": {
              "auto.offset.reset": "earliest"
            }
          }
        }
      }
    },
    "PRODUCER": {
      "NOTIFICATION": {
        "EVENT": {
          "config": {
            "options": {
              "messageCharset": "utf8"
            },
            "rdkafkaConf": {
              "debug": "all",
              "metadata.broker.list": kafkaBrokers,
              "client.id": "cep-prod",
              "event_cb": true,
              "compression.codec": "none",
              "retry.backoff.ms": 100,
              "message.send.max.retries": 2,
              "socket.keepalive.enable": true,
              "queue.buffering.max.messages": 10000000,
              "batch.num.messages": 100,
              "dr_cb": true,
              "socket.blocking.max.ms": 1,
              "queue.buffering.max.ms": 1,
              "broker.version.fallback": "0.10.1.0",
              "api.version.request": true
            }
          }
        }
      }
    }
  },
  "HUB_PARTICIPANT": {
    "NAME": "Hub"
  }
}