migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = ""
  collection.viewRule = ""
  collection.deleteRule = "@request.auth.role = 'admin'"
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": false,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": true
  }

  // remove
  collection.schema.removeField("users_name")

  // remove
  collection.schema.removeField("users_avatar")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "az3doepg",
    "name": "role",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "student",
        "teacher"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "go9ixm5b",
    "name": "is_active",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fa7rugg3",
    "name": "profile",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "u1w8yighywrkzl3",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.listRule = null
  collection.viewRule = null
  collection.deleteRule = null
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": true,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": false
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_name",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_avatar",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif"
      ],
      "thumbs": null
    }
  }))

  // remove
  collection.schema.removeField("az3doepg")

  // remove
  collection.schema.removeField("go9ixm5b")

  // remove
  collection.schema.removeField("fa7rugg3")

  return dao.saveCollection(collection)
})
