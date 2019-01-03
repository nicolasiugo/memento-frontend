import React, { Component } from 'react'
import 'react-quill/dist/quill.snow.css';

/**
 * Uses require() for react-quill only on the client side.
 * We need to use require because import only works at top level
 * When SSRing, we can´t render Quill, becuase there is no DOM
 */
export default class HtmlEditor extends Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }

  render() {
    const ReactQuill = this.ReactQuill
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <ReactQuill
          onChange={this.props.onChange}
          value={this.props.value}
        />
      )
    } else {
      return <textarea />;
    }
  }
}
