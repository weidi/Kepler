
K.Plugin({
	name: 'import',
	templates: {
		//new placeholder
		panelImport: {},

		panelImport: {
			'panelImport_import_name': {order:0}
		},
		panelAdmin: 'panelAdmin_import',
		tabPlace: 'tabPlace_import'
	},
	filters: {
		currentUser: {
			fields: {
				imports:1
			}
		},
		placePanel: {
			fields: {
				import: 1
			}
		},
/*	moved to quert	placeItem: {
			fields: {
				import: 1
			}	
		}*/
	},
	schemas: {
		place: {
			import: {}
		},
		user: {
			imports: []
		}
	},	
	settings: {
		/**
		 * define a targets used by plugin upload
		 */
		"public": {
			"upload": {
				"targets": {
					"import_places": {
						"url": "",
						"maxFileSize": 2e+7,
						"mimeFileType": {
							"application/json": true,
							"application/geo+json": true
						}
					}
				}
			}
		},
		"upload": {
			"targets": {
				"import_places": {
					//pass uploaded object to this method
					"method": "importFile",
					"path": ""
				}
			}
		}
	}
});
