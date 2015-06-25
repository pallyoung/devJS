(function() {	
	var VERSION="1.0";
	var guid = Date.now();
	var log = {
		realConsole: window.console,
		wrapperMsg: function(msg) {
			return typeof msg == "string" ? msg : JSON.stringify(msg);
		},
		init: function() {
			window.console = {
				log: function(msg) {
					debug.consoleEntity.storage.push("&lt;&lt;" + debug.wrapperMsg(msg), "log");
					debug.consoleEntity.print();
					debug.console.log(msg);
				},
				warn: function(msg) {
					debug.consoleEntity.storage.push("&lt;&lt;" + debug.wrapperMsg(msg), "warn");
					debug.consoleEntity.print();
					debug.console.warn(msg);
				},
				error: function(msg) {
					debug.consoleEntity.storage.push("&lt;&lt;" + debug.wrapperMsg(msg), "error");
					debug.consoleEntity.print();
					debug.console.error(msg);
				},
				dir: function(msg) {
					debug.consoleEntity.storage.push("&lt;&lt;" + debug.wrapperMsg(msg), "dir");
					debug.consoleEntity.print();
					debug.console.dir(msg);
				},
				info: function(msg) {
					debug.consoleEntity.storage.push("&lt;&lt;" + debug.wrapperMsg(msg), "info");
					debug.consoleEntity.print();
					debug.console.info(msg);
				},
				clear: function() {
					debug.consoleEntity.clear(true);
				},
				time: function(msg) {

				},
				timeEnd: function(msg) {

				},
			};
			//对原生的console对象进行重写
		},
		consoleEntity: {
			//控制台
			open: function() {
				//显示控制台
				this.screen.frame.style.display = "block";
				this.screen.inputBox.focus();
			},
			close: function() {
				//隐藏控制台
				this.screen.frame.style.display = "none";

			},
			clear: function(clearStorage) {
				//清除控制台内容
				debug.consoleEntity.screen.msgBox.innerHTML = "";
				if (clearStorage) {
					debug.consoleEntity.storage.clear.call(debug.consoleEntity.storage);

				}
			},
			print: function() {
				var content = sessionStorage[this.storage.keyName];
				content = content.split(this.storage.splitCode);
				content = content.join("");
				// content = "<p>" + content + "</p>";
				this.screen.msgBox.innerHTML = content;

			},
			initScreen: function(style) {

			},
			screen: {
				frame: {

				},
				msgBox: {

				},
				inputBox: {

				}
				//控制台输出输入屏幕就是一个dom节点，在调用initScreen之后正式有值
			},
			storage: {
				//数据存储在sessionStorage或者localStorgae里面，以“”分隔每条数据
				splitCode: "@$$@,",
				keyName: "debuginfo",
				swithTag: {
					error: function(msg) {
						return "<p style='color:red'>" + msg + "</p>"
					},
					log: function(msg) {
						return "<p style='color:black'>" + msg + "</p>"
					},
					info: function(msg) {
						return "<p style='color:#8eb9f5'>" + msg + "</p>"
					},
					warn: function(msg) {
						return "<p style='color:rgb(255,255,0)'>" + msg + "</p>"
					}
				},
				push: function(msg, tag) {
					var _msg = msg;
					if (tag && this.swithTag[tag]) {
						_msg = this.swithTag[tag](_msg);
					} else {
						_msg = this.swithTag["log"](_msg);
					}
					try {
						sessionStorage[this.keyName] += this.splitCode + _msg;
					} catch (e) {
						sessionStorage[this.keyName] = _msg;
					}

				},
				shift: function(msg) {
					try {
						var reg = new RegExp("(^" + msg + this.splitCode + ")");
						var returnMsg = "";
						if (reg.test(sessionStorage[this.keyName])) {
							returnMsg = RegExp.$1;
							sessionStorage[this.keyName] = sessionStorage[this.keyName].replace(reg, "");
							return returnMsg;
						} else {
							returnMsg = sessionStorage[this.keyName];
							sessionStorage[this.keyName] = "";
							return returnMsg;
						}
					} catch (e) {
						sessionStorage[this.keyName] = msg;
					}
				},
				pop: function(msg) {
					try {
						var reg = new RegExp("(" + this.splitCode + msg + "$)");
						var returnMsg = "";
						if (reg.test(sessionStorage[this.keyName])) {
							returnMsg = RegExp.$1;
							sessionStorage[this.keyName] = sessionStorage[this.keyName].replace(reg, "");
							return returnMsg;
						} else {
							returnMsg = sessionStorage[this.keyName];
							sessionStorage[this.keyName] = "";
							return returnMsg;
						}
					} catch (e) {
						sessionStorage[this.keyName] = "";
						return "";
					}
				}
			},
			unshift: function(msg) {
				var _msg = msg;
				if (tag) {
					_msg = this.swithTag[tag]();
				}
				try {
					sessionStorage[this.keyName] = _msg + this.splitCode + sessionStorage[this.keyName];
				} catch (e) {
					sessionStorage[this.keyName] = _msg;
				}

			},
			clear: function() {
				try {
					sessionStorage[debug.consoleEntity.storage.keyName] = "";
					debug.consoleEntity.screen.msgBox.innerHTML = "";
				} catch (e) {
					return;
				}

			}
		},
		getCode: function(msg) {
			var _msg = msg.replace(/<\/?[^>]+>/g, "");
			_msg = _msg.replace(/&nbsp;?/g, "");
			if (msg !== "") {
				_msg = "(" + _msg + ")";
			}
			return _msg;
		},
		exec: function(code) {
			// 执行输入的js代码
			try {
				if (code !== "") {
					var stemp = eval(code);
					console.log(stemp);
				}
			} catch (e) {
				console.error(e);
			}
		},
		runListener: function(e) {
			var keycode = e.keyCode;
			var code = "";
			if (keycode == 13) {
				e.preventDefault();
				debug.consoleEntity.storage.push("<div>&gt;&gt;" + debug.consoleEntity.screen.inputBox.value + "</div>");
				code = debug.getCode(debug.consoleEntity.screen.inputBox.value);
				debug.consoleEntity.screen.inputBox.value = "";
				debug.run(code);
			}

		},
		init: function(style) {
			this.initConsole();
			this.consoleEntity.initScreen(style);
			this.consoleEntity.screen.inputBox.addEventListener("keypress", this.runListener, false);
		}
	}

	function initScreen() {

	}
	function writeCSS(){
		var styles=[];
		styles.push();
	}

	var DEVTools = {
		open: function() {
			myConsole.consoleEntity.open();
		},
		close: function() {
			myConsole.consoleEntity.close();
		}
	}

	window.DEVTools = DEVTools;
})()