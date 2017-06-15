define( [ 
    'jquery',"qlik"
],
function ( $,qlik) {

	return {
		initialProperties: {
            listItems: []
        },
		definition : {
			type : "items",
			component : "accordion",
			items: {
				defaultValueSetting:{
					type: "array",
                    ref: "listItems",
                    label: "Default values",
                    itemTitleRef: "label",
                    allowAdd: true,
                    allowRemove: true,
                    addTranslation: "Add default value",
                    items: {
						field : {
							ref : "field",
							label : "Field (without equal sign)",
							type : "string",
							expression:"optional"
						},
						value : {
							ref : "value",
							label : "Value",
							type : "string",
							expression:"optional"
						},
                    }
				},
				Properties : {
					type : "items",
					label : "Property setting",
					items : {
						thresholdTime : {
							ref : "thresholdTime",
							label : "Threshold time (in second)",
							type : "number"
						}
					}
				},
				settings: {
					uses: "settings",
				}
			}
		},
		paint: function ($element,layout) {
			var carryOnFlag =true;
			if(sessionStorage.getItem('defaultSelectionApplied')!=null)
			{
				console.log("Default selection is disabled for this session because it is already been performed.");
			} 
			else if(layout.thresholdTime>0)
			{
				if(window.performance.now()>layout.thresholdTime*1000)
				{
					console.log("Default selection is disabled for this session because it passes threshold time.");
				}
			}
			else{
				var app=qlik.currApp();
				var field;
				var value;
				layout.listItems.forEach(function(i){
					field=app.field(i.field);
					value=i.value;
					console.log(field)

					field.clear();
					field.selectMatch(value, true);
					sessionStorage.setItem('defaultSelectionApplied', 'true');
					// if (field.field==null){
					// 	console.log("Field name error, unable to identify the field, Please remove equal sign(=) from field definition");
					// }
					// else{
					// 	field.clear();
					// 	field.selectMatch(value, true);
					// 	sessionStorage.setItem('defaultSelectionApplied', 'true');
					// }
				})
			}
		}
	};

} );

