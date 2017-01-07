Object.merge = function (objs) {
   'use strict';

   if (objs == null || !Array.isArray(objs)) {
      throw new TypeError('Input parameter is empty or not an array');
   }

   function mergeKeys(srcObj, tarObj) {
      tarObj = tarObj || {};

      Object.keys(srcObj).forEach(key => {

         let src = srcObj[key];
         let tar = tarObj[key];

         if (!Array.isArray(src)) { src = [src] }

         src.forEach(src => {

            if (tarObj.hasOwnProperty(key)) {
               if (typeof src === 'object') { mergeKeys(src, tar) }
               else if (tar.indexOf(src) === -1) { tar.push(src) }
            } else {
               if (typeof src === 'object') { tar = mergeKeys(src, tar) }
               else { tar = [src] }
            }

            tarObj[key] = tar;

         })

      })
      return tarObj
   }

   let tarObj = {};

   objs.forEach(srcObj => {
      tarObj = mergeKeys(srcObj, tarObj)
   })

   return tarObj
}w
