var isIE = /*@cc_on!@*/false || !!document.documentMode; 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
		if(isIE || isSafari) {
			const cssLoader = function (stylesheet) {
			const link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('type', 'text/css');
			link.setAttribute('href', stylesheet);
			document.getElementsByTagName('head')[0]
				.appendChild(link);
			};

			document.addEventListener('DOMContentLoaded', function() {
				cssLoader('/css/client/explorer.css');
			});
		} else {
			const cssLoader = function (stylesheet) {
				const link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('type', 'text/css');
				link.setAttribute('href', stylesheet);
				document.getElementsByTagName('head')[0]
					.appendChild(link);
			};
			
			document.addEventListener('DOMContentLoaded', function() {
				cssLoader('/css/client/main.css');
			});

		}

