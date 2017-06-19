# defaultSelectionExtension

Sets predefined values when a sheet being opened.

![alt text](https://github.com/wuzhong-zhu/defaultSelectionExtension/raw/master/Media/Capture.PNG)

Take note:

1.Consider [App Integration API](http://help.qlik.com/en-US/sense-developer/3.2/Subsystems/APIs/Content/AppIntegrationAPI/app-integration-api.htm) for default selection before using this extension

2.Selection will be made only once in one single session.

3.Extension works on sheet level, so idealy this extension should be placed on the first sheet your user sees. However, you can put this extension in every sheet, and selection will be made only once.

4.Refreshing webpage won't reset flag, you have to completely close the tab to reset default selection funtionality.

5.Values can be a expression(like "today","last week","last 5 years" etc), but the Field must be a string without equal sign.
![alt text](https://github.com/wuzhong-zhu/defaultSelectionExtension/raw/master/Media/property.PNG)

6.Threshhold sets the time this extension stop working.

For example if threshold time is 10. Default selection won't happen if the user navigate to this page after 10 seconds he opened this app.

What is it for? If your user starts with the last sheet and he navigates backwards. It makes no sense for default selection to happen when your user goes back to the first page. And it could be annoying.

Ideally this extension should detect if current sheet is the first sheet user opens but I don't know how to do that.So a timers is the best I can do.
![alt text](https://github.com/wuzhong-zhu/defaultSelectionExtension/raw/master/Media/showcase.gif)
