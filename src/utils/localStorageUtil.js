export const setAuthorisationInfo = (user = null) => {
  if (localStorage) {
    if (user) {
      localStorage.setItem('burgerBuilderAuthInfo', JSON.stringify(user));
      localStorage.setItem(
        'burgerBuilderTokenExpireDate',
        new Date(new Date().getTime() + user.expiresIn * 1000)
      );
    } else {
      localStorage.removeItem('burgerBuilderAuthInfo');
      localStorage.removeItem('burgerBuilderTokenExpireDate');
    }
  }
};

export const getAuthorisationInfo = () =>
  JSON.parse(localStorage.getItem('burgerBuilderAuthInfo'));

export const getTokenExpirationDate = () =>
  new Date(localStorage.getItem('burgerBuilderTokenExpireDate'));
