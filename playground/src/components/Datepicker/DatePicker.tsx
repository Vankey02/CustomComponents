import {
  format,
  lastDayOfMonth,
  addMonths,
  differenceInDays,
  isEqual,
  compareAsc,
} from "date-fns";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropdown,
} from "react-icons/io";
import { useDebounce } from "./useDebounce";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(
    new Date().getMonth() === date.getMonth() ? new Date().getDate() - 1 : -1
  );

  const [delay, setDelay] = useState(1);
  const openState = useDebounce(isOpen, delay);
  const changeMonth = (newDate: Date, num: number) => {
    setCalendarDate(addMonths(newDate, num));
  };
  const first = new Date(format(calendarDate, "yyyy-MM-1")).getDay();
  const today = new Date();
  const last = format(lastDayOfMonth(calendarDate), "dd");
  const arr: number[] = new Array();
  const weekDays: string[] = ["p", "w", "s", "c", "p", "s", "n"];
  const firstDayStyle = {
    gridColumnStart: `${first}`,
  };
  const currentDateStyle = {
    borderWidth: "1px",
    borderColor: "#a9c2d2",
  };
  const selectedStyle = {
    // color: "white",
    // backgroundColor: "transparent",
  };

  const getStyle = (index: number): Object => {
    return {
      ...(() => {
        if (
          isEqual(
            new Date(format(calendarDate, `yyyy-MM-${index + 1}`)),
            new Date(format(today, "yyyy-MM-d"))
          )
        )
          return currentDateStyle;
      })(),
      ...(() => {
        if (index == 0) return firstDayStyle;
      })(),
      ...(() => {
        if (index == isSelected) {
          return selectedStyle;
        }
      })(),
    };
  };
  useEffect(() => {
    if (
      calendarDate.getMonth() == date.getMonth() &&
      calendarDate.getFullYear() == date.getFullYear()
    ) {
      setIsSelected(date.getDate() - 1);
    } else {
      setIsSelected(-1);
    }

    console.log(isSelected);
    console.log(new Date().getMonth());
    console.log(date.getMonth());
    console.log("userdate " + format(date, `yyyy-MM-d`));
    console.log("calendarDate " + format(calendarDate, "yyyy-MM-dd"));
    console.log("today " + format(today, "yyyy-MM-dd"));
    console.log("calendar Year " + calendarDate.getFullYear());
    console.log(
      "difference in days: " +
        differenceInDays(
          new Date(format(calendarDate, "yyyy-MM-dd")),
          new Date(format(today, "yyyy-MM-dd"))
        )
    );
    console.log(
      isEqual(
        new Date(format(calendarDate, `yyyy-MM-dd`)),
        new Date(format(today, "yyyy-MM-dd"))
      )
    );
  }, [isSelected, date, calendarDate]);

  for (let i = 0; i < parseInt(last); i++) {
    arr.push(i + 1);
  }
  const yearsToSelect: string[] = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() + 1).toString(),
  ];
  return (
    <>
      <div className="flex flex-col h-[340px] w-[320px] border-white rounded-md shadow-xl ">
        <div className="flex justify-between">
          <div className="flex justify-around w-28 ml-4 ">
            <p className="flex">{format(calendarDate, "MMM").toString()}</p>
            <p className="flex">{format(calendarDate, "yyyy").toString()}</p>
            {/* <div className="flex mr-10"> */}
            <motion.p
              className="flex"
              initial={false}
              animate={openState ? "open" : "closed"}
              onClick={() => {
                setDelay(1);
                setIsOpen((prev) => !prev);
              }}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              style={{
                paddingTop: 4,
              }}
            >
              <IoMdArrowDropdown style={{ cursor: "pointer" }} />
            </motion.p>
            {/* </div> */}
          </div>
          <div className="flex w-16 justify-around mr-4 pt-1">
            {calendarDate.getMonth() <= new Date().getMonth() &&
            calendarDate.getFullYear() <= new Date().getFullYear() ? (
              <IoIosArrowBack style={{ pointerEvents: "none", opacity: 0.5 }} />
            ) : (
              <IoIosArrowBack
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeMonth(calendarDate, -1);
                }}
              />
            )}

            <IoIosArrowForward
              style={{ cursor: "pointer" }}
              onClick={() => {
                changeMonth(calendarDate, 1);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2 px-5 ">
          {!openState &&
            weekDays.map((item, index: number) => {
              return (
                <p className="w-8 h-8 font-semibold" key={index}>
                  {item}
                </p>
              );
            })}
        </div>

        {!openState ? (
          <motion.div className="grid grid-cols-7 gap-2 rounded-md p-5 isolate invert text-white ">
            {arr.map((item, index: number) => {
              return differenceInDays(
                new Date(format(today, "yyyy-MM-d")),
                new Date(format(calendarDate, `yyyy-MM-${index + 1}`))
              ) > 0 ? (
                <div
                  className="text-sm  round w-8 h-8 text-center opacity-40 pt-1.5"
                  key={index}
                  style={getStyle(index)}
                >
                  {item}
                </div>
              ) : (
                <motion.div
                  //hover:bg-[#8e6145]
                  className="relative pt-1.5  hover-shadow text-sm  round w-8 h-8 text-center rounded-full cursor-pointer"
                  layoutId={`${index}`}
                  style={getStyle(index)}
                  key={index}
                  onClick={() => {
                    setIsSelected(index);
                    setDate(
                      new Date(format(calendarDate, `yyyy-MM-${index + 1}`))
                    );
                    setCalendarDate(
                      new Date(format(calendarDate, `yyyy-MM-${index + 1}`))
                    );
                  }}
                >
                  {isSelected == index && (
                    <motion.div
                      //bg-[#563d2d]
                      className="absolute bg-[#cfdde6] z-0 inset-0 rounded-full"
                      layoutId="active-index"
                      transition={{ type: "spring", duration: 0.5 }}
                    ></motion.div>
                  )}
                  <span className="relative z-10 mix-blend-exclusion  ">
                    {item}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="flex flex-row justify-evenly items-center  h-full">
            {yearsToSelect.map((item, index) => {
              return (
                <motion.div
                  className="flex cursor-pointer relative"
                  key={index}
                  onClick={() => {
                    setCalendarDate((prevDate) => {
                      return compareAsc(
                        new Date(
                          format(
                            prevDate,
                            `${new Date().getFullYear() + index}-MM-dd`
                          )
                        ),
                        today
                      ) == -1
                        ? today
                        : new Date(
                            format(
                              prevDate,
                              `${new Date().getFullYear() + index}-MM-dd`
                            )
                          );
                    });
                    setDelay(800);
                    setIsOpen((prev) => !prev);
                  }}
                >
                  {calendarDate.getFullYear().toString() == item ? (
                    <motion.div
                      className="absolute bg-[#563d2d] inset-x-0 bottom-0 h-1 rounded-full"
                      layoutId="active-year"
                      transition={{ type: "spring", duration: 0.6 }}
                    ></motion.div>
                  ) : null}
                  <p className="relative">{item}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
