/**
 * @file
 * Javascript functionality for styling pullquotes within content.
 */

(function (window) {
  Drupal.behaviors.pullquote = {
    attach: function(context, settings) {
      if (window.location.pathname == "/admin/config/content/pullquote-style") {
        return
      }
      const pullquotes = document.getElementsByClassName("pullquote")

      for (pullquote of pullquotes) {
        if (!pullquote.className.includes("processed")) {
          let [parent, position] = parentAndPosition(pullquote)
          parent.classList.add("pullquote-container")

          if (position == 0 && parent.nodeName == 'BLOCKQUOTE') {
            parent.prepend(formatPullquote(pullquote, 'div'))
          } else if (position == 0) {
            parent.prepend(formatPullquote(pullquote, 'span'))
          } else {
            parent.before(formatPullquote(pullquote, 'span'))
          }
          pullquote.classList.add("processed")
        }
      }

      // HTMLElement -> Number -> [HTMLElement, Number]
      function parentAndPosition(node, position = 0) {
        const parent = node.parentElement
        if (parent.nodeName == 'DIV') {
          return [parent, 0]
        } else if (
          parent.nodeName == 'UL' ||
          parent.nodeName == 'P' ||
          parent.nodeName == 'SPAN' ||
          parent.nodeName == 'BLOCKQUOTE'
        ) {
          return [parent, position]
        } else {
          position += 1
          return parentAndPosition(parent, position)
        }
      }

      // HTMLElement -> String -> HTMLElement
      function formatPullquote(pullquote, type = 'span') {
        const leftClass = pullquote.className.includes("pullquote-left") ? "pullquote-left" : ""
        const text = document.createTextNode(pullquote.innerText)
        let quote = document.createElement(type)
        quote.appendChild(text)
        quote.className = `pullquote pullquote-processed pullquote-quote ${leftClass}`
        return quote
      }

    }
  }
})(window)
