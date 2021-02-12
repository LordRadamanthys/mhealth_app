import * as React from "react"
import Svg, { Ellipse, Circle, Path } from "react-native-svg"
import ImageInterface from "../interfaces/ImagesInterfaces"

const ImageDone: React.FC<ImageInterface> = ({ height, width }) => {
    return (
        <Svg
            data-name="Layer 1"
            width={width ? width : 200}
            height={height ? height : 200}
            viewBox="0 0 718.586 557.817"

        >
            <Ellipse cx={333} cy={546.817} rx={333} ry={11} fill="#e6e6e6" />
            <Circle cx={328} cy={137.817} r={41} fill="#6c63ff" />
            <Path
                d="M317.155 232.616l-18.552-14.198-66.42 120.301a10.8 10.8 0 1012.62 9.068zM486.5 300.897a10.807 10.807 0 00-10.649-7.27l-107.016-83.945-16.052 16.974 112.737 78.578a10.802 10.802 0 1020.98-4.337zM362.3 535.033h12.608l6-48.629H362.3v48.629z"
                fill="#ffb8b8"
            />
            <Path
                d="M399.222 546.74h-39.624v-15.31h24.315a15.31 15.31 0 0115.31 15.31z"
                fill="#2f2e41"
            />
            <Path
                fill="#ffb8b8"
                d="M262.401 523.777l11.583 4.978 24.714-42.309-17.096-7.347-19.201 44.678z"
            />
            <Path
                d="M291.7 549.111l-36.404-15.645 6.045-14.065 22.34 9.6a15.31 15.31 0 018.02 20.11zM301.698 301.866l-59.974 188.935 78.716 8.434L328 388.817l10.245 110.418 63.723-7.497s-11.51-174.878-32.463-186.123-67.807-3.749-67.807-3.749z"
                fill="#2f2e41"
            />
            <Circle cx={334.217} cy={162.462} r={26.239} fill="#ffb8b8" />
            <Path
                d="M333.376 310.336c-18.219 0-35.752-.808-36.656-2.374a.663.663 0 01.128-.826c1.254-1.846-1.69-31.847-7.886-80.237a25.066 25.066 0 0116.508-26.71l.116-.027 54.914-5.423.615.173a24.844 24.844 0 0118.158 25.156c-1.416 30.868-3.792 83.15-3.792 86.484 0 .907-1.262 1.36-2.362 1.656-5.347 1.432-22.84 2.128-39.743 2.128zm-35.82-2.493z"
                fill="#2f2e41"
            />
            <Path
                fill="#f2f2f2"
                d="M50.42 168.735l61.231-76.517 76.517 61.23-61.23 76.518z"
            />
            <Path
                d="M126.407 247.145a22 22 0 1125.064-18.433 22 22 0 01-25.064 18.433zm6.329-41.52a20 20 0 1016.758 22.785 20.022 20.022 0 00-16.758-22.785z"
                fill="#3f3d56"
            />
            <Path
                d="M79.578 495.203c-7.51 25.087 4.145 50.735 4.145 50.735s23.831-15.025 31.341-40.111-4.145-50.735-4.145-50.735-23.831 15.025-31.341 40.111z"
                fill="#e6e6e6"
            />
            <Path
                d="M90.98 495.882c6.32 25.412-6.53 50.483-6.53 50.483s-23.097-16.13-29.417-41.542 6.529-50.483 6.529-50.483 23.098 16.13 29.418 41.542z"
                fill="#e6e6e6"
            />
            <Path
                d="M297.318 145.083a90.61 90.61 0 0045.542 11.004c6.083-.158 12.786-1.265 16.639-5.976 4.347-5.315 3.259-13.62-.934-19.057s-10.754-8.503-17.298-10.581c-6.192-1.967-12.827-3.234-19.177-1.86a23.879 23.879 0 00-17.304 31.725"
                fill="#6c63ff"
            />
            <Circle cx={299} cy={108.817} r={23} fill="#6c63ff" />
            <Path
                d="M714.613 111.367l-90.284-52.62 11.582-19.872a5 5 0 10-8.64-5.035L615.69 53.71 525.405 1.09a8 8 0 00-10.94 2.883l-70.497 120.955a8 8 0 002.883 10.94l90.285 52.621-79.058 135.643a5 5 0 108.64 5.035l79.057-135.642 90.285 52.62a8 8 0 0010.94-2.883l70.497-120.955a8 8 0 00-2.884-10.94z"
                fill="#3f3d56"
            />
            <Ellipse
                cx={797.269}
                cy={336.18}
                rx={10}
                ry={38}
                transform="rotate(-59.765 528.041 460.084)"
                opacity={0.1}
                style={{
                    isolation: "isolate",
                }}
            />
            <Circle cx={580.732} cy={123.618} r={48} fill="#6c63ff" />
            <Path
                d="M601.616 147.364c-2.781 4.771-22.396 7.78-36.711-.562s-17.908-24.88-15.127-29.651 10.883 4.028 25.198 12.371 29.42 13.07 26.64 17.842z"
                fill="#f2f2f2"
            />
            <Circle cx={570.285} cy={97.852} r={10} fill="#f2f2f2" />
            <Circle cx={606.572} cy={119.001} r={10} fill="#f2f2f2" />
        </Svg>
    )
}

export default ImageDone