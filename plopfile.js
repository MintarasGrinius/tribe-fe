const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return fieldName + ' is required'
    }
    return true
  }
}

module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'Create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
        validate: requireField('name'),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
    ],
  })
}
