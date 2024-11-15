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

            // Simple formatting logic
            switch (this.selectedLanguage) {
                case 'html':
                    this.outputCode = this.beautifyHTML(this.inputCode);
                    break;
                case 'css':
                    this.outputCode = this.beautifyCSS(this.inputCode);
                    break;
                case 'javascript':
                    this.outputCode = this.beautifyJS(this.inputCode);
                    break;
                default:
                    this.outputCode = this.inputCode;
            }

            this.highlightCode();
        },
        beautifyHTML(code) {
            return code.replace(/(>)(<)/g, '$1\n$2').trim();
        },
        beautifyCSS(code) {
            return code.replace(/;(?=\S)/g, ';\n').trim();
        },
        beautifyJS(code) {
            return code.replace(/;(?!\n)/g, ';\n').trim();
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
