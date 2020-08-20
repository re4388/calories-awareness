# Readme

## Function in GCP folder are deployed in the GCP
- GCP project name: auto-disable-bill
  - https://console.cloud.google.com/functions/list?hl=zh-TW&project=auto-disable-bill
- Function 1
  - auto-disable-firebase-project
  - log: https://console.cloud.google.com/logs/query;query=resource.type%3D%22cloud_function%22%20resource.labels.function_name%3D%22auto-disable-firebase-project%22%20resource.labels.region%3D%22us-central1%22?hl=zh-TW&project=auto-disable-bill
- Function 2
  - see-bill-log
  - log: https://console.cloud.google.com/functions/details/us-central1/see-bill-log?hl=zh-TW&project=auto-disable-bill&tab=general