export const FadeUp = (delay) => {
  return {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}


export const FadeLeft = (delay) => {
  return {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}


export const FadeRight = (delay) => {
  return {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: delay,
      },
    },
  }
}
