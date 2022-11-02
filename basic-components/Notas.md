*"Attributes" vs "Properties"*
A common mistake is to confuse HTML attributes and DOM object properties.

First of all, it's important to understand that the browser essentially "translates" your HTML code to a tree of DOM nodes (= objects if you access them in JavaScript).

A HTML tag can have an attribute and the "DOM objects" (JavaScript objects for DOM nodes) can (and most likely will) have properties. Often, attributes and properties are linked.

For example, an <input value="Starting value"> element has a value attribute. If you access that element via JavaScript, its respective objects representation also has a value property. Behind the scenes, the value attribute and value property are kind of linked.

Other objects have no attribute equivalents though. For example, you can set aria- attributes (for accessibility: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) on HTML elements. These attributes have no linked properties since they're only required in the markup for screen-readers to read them.

And even for the <input> element, it's not as simple as it might seem. If you change the value property programmatically, you will notice that the attribute value (which you can see in your browser dev tools) does not reflect that change. So it's a one-way route for this attribute basically.

We'll dive deeper into this throughout the course and you will learn how to set attributes, properties and how to synchronize them.

For now, it's just important to keep in mind that HTML attributes and DOM properties CAN be connected but don't have to. They're not the same.