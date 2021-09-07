# WebTextureShaderLab
一个基于web技术的2D shader框架，使用多线程软渲染。实现了基于js语法的简易片元着色器；实现了Shader脚本参数可视化面板；支持自定义着色器。

## 自定义着色器 Write Shader
在graphicsScripts目录下新建一个js脚本文件，编写继承自Momo类的着色器子类：
```
class Example extends Momo {
	constructor() {
		super();
		this.mainColor = new D2dColor("#FF8945");
		
		this.frag = `
			return new D2dColor(tool.color); 
		`; // 'tool' is a object created with 'this.start' as a construct function.
		
		this.start = `
			this.color = momo.mainColor;
		`; // 'momo' is a object containing all d2d attributes of 'Example'. It also can be used in 'frag' function.
	}
}

```
#### 注意：着色器子类类名和脚本文件名必须一致，且一个脚本文件中应该只编写一个着色器子类。
修改js/select-list.js文件，添加新的着色器类名到着色器列表中（参照下面第5行）：
```
var scriptsRoot = "graphicsScripts/"
var scriptList = [
	"DemoNoise",
	"DemoGrid",
	"Example"
]
```
运行index.html页面，在右边着色器列表选择Example着色器：
![第一次选中着色器](example/Example.png "第一次选中着色器")
![修改着色器属性](example/Example01.png "修改着色器属性")
![点击空白应用颜色拾取器修改](example/Example02.png "点击空白应用颜色拾取器修改")
