export const generateDisplayableImage = (image: string): string => {
  if (image) {
    return `data:image/jpeg;base64,${image}`
  } else {
    return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
  }
}
