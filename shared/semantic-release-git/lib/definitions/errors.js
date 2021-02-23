module.exports = {
  EINVALIDASSETS: ({ assets }) => ({
    message: 'Invalid `assets` option.',
    details: `The [assets option] option must be an \`Array\` of \`Strings\` or \`Objects\` with a \`path\` property.

Your configuration for the \`assets\` option is \`${assets}\`.`,
  }),
  EINVALIDMESSAGE: ({ message }) => ({
    message: 'Invalid `message` option.',
    details: `The [message option] option, if defined, must be a non empty \`String\`.

Your configuration for the \`successComment\` option is \`${message}\`.`,
  }),
};
