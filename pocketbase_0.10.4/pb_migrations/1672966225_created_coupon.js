migrate((db) => {
  const collection = new Collection({
    "id": "byisp65lkhov9uy",
    "created": "2023-01-06 00:50:25.578Z",
    "updated": "2023-01-06 00:50:25.578Z",
    "name": "coupon",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hkiiddnu",
        "name": "code",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hnys9p9b",
        "name": "amount",
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
        "id": "py0yrog7",
        "name": "is_active",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "fshzef9v",
        "name": "usage",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "fscoxkqo",
        "name": "max_usage",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("byisp65lkhov9uy");

  return dao.deleteCollection(collection);
})
