import {
  createContext,
} from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';


export default createContext({}, function (prevContext, context) {

  let changes = 0;

  /**
   * Сначала проверяем нативными средствами на идентичность свойств первого уровня.
   */
  if (context && !shallowEqual(prevContext, context)) {
    // if (context) {

    /**
     * Если есть несоответствия, то проходимся по элементам первого уровня
     * и проверяем свои собственные известные свойства
     */

    Object.keys(context).map(key => {

      const value = context[key];
      const prevValue = prevContext[key];

      if (value !== undefined && value !== prevValue) {

        // console.log("calculateChangedBits", key, prevValue, value);

        switch (key) {

          case "router":

            if (value && (!prevValue || prevValue.history.location.pathname !== value.history.location.pathname)) {

              // console.log("temp3.history.location", value.history.location
              //   , prevValue.history.location.pathname
              //   , value.history.location.pathname
              // );

              changes++;

            }

            break;

          case "query":


            if (!shallowEqual(value, prevValue)) {

              if (process.env.NODE_ENV === "development") {

                console.error("calculateChangedBits query !shallowEqual", prevValue, value);

              }

              if (JSON.stringify(value) !== JSON.stringify(prevValue)) {

                if (process.env.NODE_ENV === "development") {

                  console.error("calculateChangedBits query !JSON.stringify Equal",
                    JSON.stringify(prevValue, true, 2),
                    JSON.stringify(value, true, 2)
                  );

                }

                changes++;
              }

            }


            break;

          default: changes++;

        }

      }

    });
  }


  if (changes && process.env.NODE_ENV === "development") {

    console.error("calculateChangedBits changes", changes);

  }

  return changes;
});
