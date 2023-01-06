migrate((db) => {
  const collection = new Collection({
    "id": "u1w8yighywrkzl3",
    "created": "2023-01-06 00:50:25.578Z",
    "updated": "2023-01-06 00:50:25.578Z",
    "name": "profile",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tuf3u771",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": true,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "1x4g4i0n",
        "name": "first_name",
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
        "id": "yykbc44w",
        "name": "last_name",
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
        "id": "iiba84fq",
        "name": "age",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "aukwciao",
        "name": "phone_number",
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
        "id": "thrt1rbl",
        "name": "gender",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "male",
            "female",
            "prefer_not_to_say",
            "others"
          ]
        }
      },
      {
        "system": false,
        "id": "aritwj33",
        "name": "state",
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
        "id": "qmbqz0zg",
        "name": "country",
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
        "id": "h8vdbz8h",
        "name": "paid",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ixs09yzz",
        "name": "avatar",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpg"
          ],
          "thumbs": []
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "user.id = @request.auth.id",
    "updateRule": "user.id = @request.auth.id",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("u1w8yighywrkzl3");

  return dao.deleteCollection(collection);
})
