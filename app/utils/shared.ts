export const handlePadding = (number: number) => {
  return {
    paddingLeft: number,
    paddingRight: number,
    paddingBottom: number,
    paddingTop: number,
  };
};

export const handleMargin = (number: number) => {
  return {
    marginLeft: number,
    marginRight: number,
    marginBottom: number,
    marginTop: number,
  };
};

export const handleSquare = (number: number) => {
  return {
    width: number,
    height: number,
  };
};

export const handleRound = (number: number) => {
  return {
    width: number,
    height: number,
    borderRadius: number / 2,
  };
};

export const passedStyle = (style: any) =>
  Array.isArray(style) ? Object.assign({}, ...style) : style;

export const validateEmail = (email: any) => {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

export const aliasExclusionRegex =
  /[^a-zA-Z0-9\s.ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
