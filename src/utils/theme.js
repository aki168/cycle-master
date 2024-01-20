export function hexToRgba(hex, alpha) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let color = hex.substring(1).split("");

    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }

    color = "0x" + color.join("");

    return (
      "rgba(" +
      [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(",") +
      ", " +
      alpha.toString() +
      ")"
    );
  }

  throw new Error("Bad Hex");
}

export const getColors = (opacity = 1) => {
  const colors = [
    "#DDDF00",
    "#50B432",
    "#058DC7",
    "#ED561B",
    "#24CBE5",
    "#64E572",
    "#FF9655",
    "#FFF263",
    "#6AF9C4",
  ];
  return colors.map((color) => hexToRgba(color, opacity));
};
