---
sidebar_position: 1
id: api
---

# API Documentation

## Generating a API Key

1. Navigate to https://id.example.com/settings/admin/api-keys
2. Click `Add API Key`
3. Enter a `Name` for the new API Key
4. Select a `Expires At` Date for when this API Key should be valid until.
5. Enter a `Description` for the new API Key
6. Click `Generate API Key`

:::important  
Make sure you copy the API Key from the Dialog window it will not be shown again!
:::

## Custom Dashboards

If you are wanting to use Pocket ID's API to build custom dashboards, or portals. See [kmendell/pocket-id-portal](https://github.com/kmendell/pocket-id-portal) for a example on how to do this.

## Endpoints

:::important  
All endpoints should have the `X-API-KEY` header with the content being the API Key when sending a request. 
:::

See the next pages for the endpoints that are available in the API.
