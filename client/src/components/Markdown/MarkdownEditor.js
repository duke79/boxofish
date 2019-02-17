import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css"
import '../../lib/styleUnmangled/Markdown.css'

class MarkdownEditor extends React.Component {
  render() {
    //Configuration: https://github.com/sparksuite/simplemde-markdown-editor#configuration
    //React component reference: https://github.com/RIP21/react-simplemde-editor
    const placeholder = this.props.placeholder;
    return <SimpleMDE
      // id="your-custom-id"
      // label="Your label"
      onChange={this.props.onChange}
      value={this.props.value}
      options={{
        autoDownloadFontAwesome: false, /*simplemde messing with font-awesome? Though fixed with autoDownloadFontAwesome:false option*/
        hideIcons: ["fullscreen", "guide", "side-by-side"],
        // lineWrapping:false,
        placeholder: placeholder,
        // promptURLs:true, //If set to true, a JS alert window appears asking for the link or image URL. Defaults to false.
        spellChecker: false,
        styleSelectedText: false, //If set to false, remove the CodeMirror-selectedtext class from selected lines. Defaults to true.
      }}
    />
  }
}

export default MarkdownEditor;