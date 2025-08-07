---
id: introduction
---

<script lang="ts">
import OpenapiSpec from '$lib/components/openapi-spec.svelte';
</script>

## Generating a API Key

1. Navigate to https://id.example.com/settings/admin/api-keys
2. Click `Add API Key`
3. Enter a `Name` for the new API Key
4. Select a `Expires At` Date for when this API Key should be valid until.
5. Enter a `Description` for the new API Key
6. Click `Generate API Key`

> [!IMPORTANT]
> Make sure you copy the API Key from the Dialog window it will not be shown again!

## Custom Dashboards

If you are wanting to use Pocket ID's API to build custom dashboards, or portals. See [pocket-id/pocket-id-portal](https://github.com/pocket-id/pocket-id-portal) for a example to get you started.

## Endpoints

> [!IMPORTANT]
> All endpoints should have the `X-API-KEY` header with the content being the API Key when sending a request.

<br />

<OpenapiSpec src="/swagger.yaml" />
