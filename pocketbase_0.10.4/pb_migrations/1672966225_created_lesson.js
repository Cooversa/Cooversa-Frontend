migrate((db) => {
  const collection = new Collection({
    "id": "6b4uceyfasojxw9",
    "created": "2023-01-06 00:50:25.579Z",
    "updated": "2023-01-06 00:50:25.579Z",
    "name": "lesson",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "48o4pq1h",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "gulfi3k4",
        "name": "slug",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ywsdvkpu",
        "name": "order",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "mq57akrd",
        "name": "content",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kfa2m53d",
        "name": "video_url",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nfb1fvbr",
        "name": "module",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "po7lfal0s28qby1",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "9l5lsgad",
        "name": "featured_image",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6b4uceyfasojxw9");

  return dao.deleteCollection(collection);
})
