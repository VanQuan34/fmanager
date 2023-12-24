
import { uid } from 'uid';
import { GLOBAL } from "src/app/common/types/global/global";

class Utils {

  /**
   * return copy object
   * @param obj 
   */
  static copyObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * remove accents string
   * @param str 
   * @returns 
   */
  static toNormalize(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

   /**
   * return true if has difference
   * @param rect1 
   * @param rect2 
   */
   static checkDifferentRect(rect1: DOMRect, rect2: DOMRect) {
    // console.log('checkDifferentRect rect1=', rect1, ' rect2=', rect2);
    if (!rect1 || !rect2) {
      return true;
    }
    const x1 = rect1.x;
    const x2 = rect2.x;
    const y1 = rect1.y;
    const y2 = rect2.y;
    const w1 = rect1.width;
    const w2 = rect2.width;
    const h1 = rect1.height;
    const h2 = rect2.height;

    if (x1 !== x2) {
      // console.log('diff x1=',x1, 'x2=',x2);
      return true;
    }

    if (y1 !== y2) {
      // console.log('diff y1=',y1, 'y2=',y2);
      return true;
    }

    if (w1 !== w2) {
      // console.log('diff w1=',w1, 'w2=',w2);
      return true;
    }

    if (h1 !== h2) {
      // console.log('diff h1=', h1, 'h2=',h2);
      return true;
    }
    // console.log('no diff');
    return false;
  }

  static isNumeric(str: any): boolean {
    if (typeof str != "string") {
      return false // we only process strings!  
    }  
    return !isNaN(parseFloat(str));
  }

}

export {
  Utils
}