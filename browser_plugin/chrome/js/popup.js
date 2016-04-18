(function(){
	var host = location.hostname;
	isPluginSetuped(function(setup){
		if(setup) {
			onWindowLoad();
		} else {
			initSetup();
		}
	});

	function $(s) { return document.querySelector(s); }
	function addHost() {
		chrome.sendMessage({cmd: 'add', host: host}, function(ret){
			console.log('添加主机 ' + host + (ret ? ' 成功！' : ' 失败！'));
		});
	}
	function removeHost() {
		chrome.sendMessage({cmd: 'remove', host: host}, function(ret){
			console.log('删除主机 ' + host + (ret ? ' 成功！' : ' 失败！'));
		});
	}
	function hidePopup() {}

	function isPluginSetuped() {
		chrome.runtime.sendMessage({cmd: 'setup'}, function(){});
	}
	function onWindowLoad() {
		chrome.runtime.sendMessage({cmd: 'query', host: host}, function(exists){
			var boxEl = $(exists ? 'info-box' : 'question-box');
			boxEl.style.display = "block";
		});
		document.body.addEventListener('click', function(e){
			var anwser = e.target.id;
			if(!anwser) { return; }
			switch(anwser.substring('anwser-'.length)) {
				case 'yes': addHost(); break;
				case 'no': hidePopup(); break;
				case 'cancel': removeHost(); break;
				case 'good': hidePopup(); break;
			}
		});
	}
})();