migrate((db) => {
  const collection = new Collection({
    "id": "gm92ubsc9yo41yx",
    "created": "2023-01-06 00:50:25.578Z",
    "updated": "2023-01-06 00:50:25.578Z",
    "name": "course",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bzaz2ihx",
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
        "id": "pn7btevf",
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
        "id": "sot1ylgv",
        "name": "order",
        "type": "number",
        "required": true,
        "unique": true,
        "options": {
          "min": 1,
          "max": null
        }
      },
      {
        "system": false,
        "id": "qp7wtdiu",
        "name": "excerpt",
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
        "id": "kugi2vnp",
        "name": "description",
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
        "id": "j3ggzra5",
        "name": "featured_image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "img/webp"
          ],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "mfkghoif",
        "name": "modules",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": null,
          "collectionId": "po7lfal0s28qby1",
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
  const collection = dao.findCollectionByNameOrId("gm92ubsc9yo41yx");

  return dao.deleteCollection(collection);
})
