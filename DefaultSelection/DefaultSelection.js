define( [ 
    'jquery',"qlik"
],
function ( $,qlik) {
	return {
		definition : {
			type : "items",
			component : "accordion",
			items : {
				Properties : {
					type : "items",
					label : "Property setting",
					items : {
						field : {
							ref : "field",
							label : "field (without equal sign)",
							type : "string",
							expression:"optional"
						},
						value : {
							ref : "value",
							label : "value",
							type : "string",
							expression:"optional"
						},
						thresholdTime : {
							ref : "thresholdTime",
							label : "threshold time (in second)",
							type : "number"
						}
					}
				},
				settings : {
					uses : "settings"
				}
			}
		},
		support : {
			snapshot: false,
			export: false,
			exportData : false
		},
		paint: function ($element,layout) {

			var carryOnFlag =true;
			if(sessionStorage.getItem('defaultSelectionApplied')!=null)
			{
				carryOnFlag = false;
			} 
			if(layout.thresholdTime>0)
			{
				if(window.performance.now()>layout.thresholdTime*1000)
				{
					carryOnFlag = false;
				}
			}
			// console.log(sessionStorage.getItem('defaultSelectionApplied'));
			// console.log(layout.thresholdTime);
			// console.log(window.performance.now());
			// console.log(carryOnFlag);


			if(carryOnFlag==true)
			{
				var app=qlik.currApp();
				var field=app.field(layout.field);
				if (field.field==null)
				{
					$element.html("Field name error, unable to identify the field, Please remove equal sign(=) from field definition");
				}
				else
				{
					var temp=layout.field;
					$element.html("Field:"+temp+" ; Value:"+layout.value);
					//There is a bug in field API, it doesnt work for field with symbol characters in name
					field.clear();
					field.selectMatch(layout.value, true);
					sessionStorage.setItem('defaultSelectionApplied', 'true');

				}
			}
		}
	};

} );

