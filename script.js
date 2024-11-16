const app = Vue.createApp({
    data() {
        return {
            selectedLanguage: 'html',
            inputCode: '',
            outputCode: '',
            highlightedCode: ''
        };
    },
    methods: {
        formatCode() {
            if (!this.inputCode.trim()) {
                alert('Please enter some code to format!');
                return;
            }

            // Format using js-beautify
            switch (this.selectedLanguage) {
                case 'html':
                    this.outputCode = this.formatHTML(this.inputCode);
                    break;
                case 'css':
                    this.outputCode = this.formatCSS(this.inputCode);
                    break;
                case 'javascript':
                    this.outputCode = this.formatJS(this.inputCode);
                    break;
                default:
                    this.outputCode = this.inputCode;
            }

            this.highlightCode();
        },
        formatHTML(code) {
            return html_beautify(code, { indent_size: 2, preserve_newlines: true });
        },
        formatCSS(code) {
            return css_beautify(code, { indent_size: 2 });
        },
        formatJS(code) {
            return js_beautify(code, { indent_size: 2 });
        },
        highlightCode() {
            this.highlightedCode = Prism.highlight(this.outputCode, Prism.languages[this.selectedLanguage], this.selectedLanguage);
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.outputCode).then(() => {
                alert('Code copied to clipboard!');
            });
        }
    }
});

app.mount('#app');