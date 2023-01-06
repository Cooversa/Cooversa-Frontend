migrate((db) => {
  const collection = new Collection({
    "id": "po7lfal0s28qby1",
    "created": "2023-01-06 00:50:25.579Z",
    "updated": "2023-01-06 00:50:25.579Z",
    "name": "module",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xqqvqa3z",
        "name": "name",
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
        "id": "uszmwywt",
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
        "id": "cctp7qfz",
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
        "id": "3j993bwm",
        "name": "course",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "gm92ubsc9yo41yx",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "efrsfjtp",
        "name": "excerpt",
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
        "id": "ysx2nvxv",
        "name": "description",
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
        "id": "4m4dla8p",
        "name": "available_at",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "oisxq93n",
        "name": "lessons",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": null,
          "collectionId": "6b4uceyfasojxw9",
          "cascadeDelete": false
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
  const collection = dao.findCollectionByNameOrId("po7lfal0s28qby1");

  return dao.deleteCollection(collection);
})
