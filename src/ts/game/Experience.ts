/* eslint-disable no-console */
class Experience {

    private levelCap: number = 100;
    private cache: any = {};

    constructor() {
      this.levelCap = 100;
      this.cache = { 0: 0 };
  
      for (let i = 1; i <= this.levelCap; i++) {
        const exp = this.expRequiredForLevel(i);
        this.cache[i] = exp;
        // console.log(
        //    'Level ' +
        //       i +
        //       ': ' +
        //       exp +
        //       ' (' +
        //       (this.cache[i] - this.cache[i - 1]) +
        //       ')'
        // );
      }
      // let xp = 62;
      // console.warn(
      //    'for ' + xp + ' exp: ',
      //    '\nlevel: ',
      //    this.levelFromExp(xp),
      //    '\nexp to level up: ',
      //    this.realExpGainRequiredForLevelUp(this.levelFromExp(xp)),
      //    '\nexp remaining: ',
      //    this.expRemainingToLevel(xp)
      // );
    }
  
    realExp(exp: number) {
      return exp - this.cache[this.levelFromExp(exp) - 1];
    }
  
    expRemainingToLevel(exp: number) {
      return this.cache[this.levelFromExp(exp)] - exp;
    }
  
    levelFromExp(exp: number) {
      let level = 1;
      while (exp >= this.realExpGainRequiredForLevelUp(level)) {
        exp -= this.realExpGainRequiredForLevelUp(level);
        level++;
      }
      if (level > this.levelCap) level = this.levelCap;
      return level;
    }
  
    realExpGainRequiredForLevelUp(level: number) {
      return this.cache[level] - this.cache[level - 1];
    }
  
    expRequiredForLevel(level: number) {
      let exp = 0;
      if (level <= 4) {
        switch (level) {
          case 1:
            exp = 50;
            break;
          case 2:
            exp = 125;
            break;
          case 3:
            exp = 250;
            break;
          case 4:
            exp = 500;
            break;
        }
      } else {
        for (let i = 1; i <= level; i++) {
          exp += i * 100;
        }
        exp -= 500;
      }
      return exp;
    }
  }
  
  export default new Experience();
  