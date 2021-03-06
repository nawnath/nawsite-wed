export const ACCESS_TOKEN = "accessToken";
export const API_TOKEN =
  "MWY5ZTNmNzFmN2M1ZTUyMjkwNjM2NGMzNmNjZTA3N2Q6M2RhMmI3OTgtNTY2MC00ZDRhLWJhZWQtNTZlMDI2MWRlYmZm";
export const JSON_CONTENT_TYPE = "application/json";
export const GENERAL_ERROR = "Something went wrong. Please try again later!";
/* tslint:disable */
export const Base64 = {
_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
encode(e) {
  let t = '';
  let n, r, i, s, o, u, a;
  let f = 0;
  e = Base64._utf8_encode(e);
  while (f < e.length) {
    n = e.charCodeAt(f++);
    r = e.charCodeAt(f++);
    i = e.charCodeAt(f++);
    s = n >> 2;
    o = ((n & 3) << 4) | (r >> 4);
    u = ((r & 15) << 2) | (i >> 6);
    a = i & 63;
    if (isNaN(r)) {
      u = a = 64;
    } else if (isNaN(i)) {
      a = 64;
    }
    t =
      t +
      this._keyStr.charAt(s) +
      this._keyStr.charAt(o) +
      this._keyStr.charAt(u) +
      this._keyStr.charAt(a);
  }
  return t;
},
decode(e) {
  let t = '';
  let n, r, i;
  let s, o, u, a;
  let f = 0;
  e = e.replace(/[^A-Za-z0-9+/=]/g, '');
  while (f < e.length) {
    s = this._keyStr.indexOf(e.charAt(f++));
    o = this._keyStr.indexOf(e.charAt(f++));
    u = this._keyStr.indexOf(e.charAt(f++));
    a = this._keyStr.indexOf(e.charAt(f++));
    n = (s << 2) | (o >> 4);
    r = ((o & 15) << 4) | (u >> 2);
    i = ((u & 3) << 6) | a;
    t = t + String.fromCharCode(n);
    if (u != 64) {
      t = t + String.fromCharCode(r);
    }
    if (a != 64) {
      t = t + String.fromCharCode(i);
    }
  }
  t = Base64._utf8_decode(t);
  return t;
},
_utf8_encode(e) {
  e = e.replace(/rn/g, 'n');
  let t = '';
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
    } else if (r > 127 && r < 2048) {
      t += String.fromCharCode((r >> 6) | 192);
      t += String.fromCharCode((r & 63) | 128);
    } else {
      t += String.fromCharCode((r >> 12) | 224);
      t += String.fromCharCode(((r >> 6) & 63) | 128);
      t += String.fromCharCode((r & 63) | 128);
    }
  }
  return t;
},
_utf8_decode(e) {
  let t = '';
  let n = 0;
  let r = 0;
  // let c1=0;
  let c2 = 0;
  while (n < e.length) {
    r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
      n++;
    } else if (r > 191 && r < 224) {
      c2 = e.charCodeAt(n + 1);
      t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
      n += 2;
    } else {
      let c3 = 0;
      c2 = e.charCodeAt(n + 1);
      c3 = e.charCodeAt(n + 2);
      t += String.fromCharCode(
        ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      n += 3;
    }
  }
  return t;
}
};


export const EMAIL_VALIDATIONS = [
  { name: 'required', message: 'Please enter your Email.' },
  {
    name: 'email',
    message: 'Please Enter a Valid Email?'
  }
];

export const PASSWORD_VALIDATIONS = [
  { name: 'required', message: 'Please enter your Password.' }
];

export const OTP_VALIDATIONS = [
  { name: 'required', message: 'Please enter 6 digit Otp.' }
];

export const REQUIRED_VALIDATIONS = (fieldName = '') =>  {
  return [
    { name: 'required', message: 'Please enter your '+fieldName+' .' }
  ]
};

export const  MOBILE_VALIDATIONS = [
  { name: "required", message: "Please enter your MobileNumber." },
  {
    name: "integer",
    message: "Please enter a valid Phone Number",
  },
  {
    name: "mobile",
    message: "Please enter a valid Phone Number",
  },
];

export const FIRSTNAME_VALIDATIONS = [
  { name: "required", message: "Please Enter First Name." },
  { name: "alphabets" }
];

export const LASTNAME_VALIDATIONS = [
  { name: "required", message: "Please Enter Last Name." },
  { name: "alphabets" }
];

export const MIDDLENAME_VALIDATIONS = [
  { name: "required", message: "Please Enter Middle Name." },
];

export const PERCENTAGE_VALIDATIONS = [
  { name: "required", message: "Please Enter Percentage." },
];

export const PINCODE_VALIDATIONS = [
  { name: 'required', message: 'Please Enter Pincode.' },
  { name: 'maxLength', message: 'Enter Valid Pincode.', maxLength: 6 },
  { name: 'minLength', message: 'Enter Valid Pincode.', minLength: 6 }
];
