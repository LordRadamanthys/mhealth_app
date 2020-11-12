import * as React from "react"
import Svg, { Path, Ellipse, Rect, Circle } from "react-native-svg"
import ImageInterface from "../interfaces/ImagesInterfaces"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const ImageEmptyList: React.FC<ImageInterface> = ({ height, width }) => {
    return (
        <Svg
            data-name="Layer 1"
            width={width? width : 200}
            height={height? height : 200}
            viewBox="0 0 995.001 836.749"
        >
            <Circle cx={75.365} cy={147.524} r={75.365} fill="#ff6584" />
      <Path
        d="M874.367 632.387a136.65 136.65 0 01-6.384 37.774c-.089.284-.182.564-.275.847h-23.822c.026-.254.051-.538.077-.847 1.588-18.26 10.746-129.397-.204-148.403.957 1.542 32.454 52.608 30.608 110.629z"
        fill="#e6e6e6"
      />
      <Path
        d="M872.58 670.161c-.2.284-.407.568-.62.847h-17.87c.136-.241.292-.525.475-.847 2.952-5.328 11.69-21.259 19.802-37.774 8.717-17.748 16.714-36.169 16.04-42.836.208 1.504 6.24 47.343-17.828 80.61z"
        fill="#e6e6e6"
      />
      <Path fill="#e6e6e6" d="M253.759 669.385h685v2.241h-685z" />
      <Path
        d="M692.223 739.355l3.328-27.453 94.004-24.125-10.815-32.444c7.534-21.607 20.76-32.2 44.923-21.629l41.564 25.82a26.533 26.533 0 0112.493 23.97 26.512 26.512 0 01-15.095 22.536c-46.53 22.056-105.834 30.495-170.402 33.325z"
        fill="#ffb8b8"
      />
      <Path
        d="M698.047 747.674l-29.117-4.16-27.233 5.558a11.763 11.763 0 01-14.105-11.035 11.763 11.763 0 014.675-9.884L674.94 696a19.266 19.266 0 0124.958 1.51l10.626 10.233c-7.604 4.717-13.259 11.796-16.638 21.63q10.962 6.026 4.16 18.3z"
        fill="#2f2e41"
      />
      <Circle cx={725.855} cy={432.526} r={26.927} fill="#ffb8b8" />
      <Path
        d="M767.926 485.627l-60.313 25.372c4.902-24.611 7.345-47.031 0-60.728l38.684-4.576c-1.92 10.526 7.866 24.623 21.629 39.932zM665.603 738.523l-22.462-1.664c-13.76-57.38-20.805-111.615-17.73-161.112a27.997 27.997 0 0128.552-26.31 27.96 27.96 0 0118.639 7.698l29.046 27.64a119.534 119.534 0 0129.43 43.82c8.227 21.545 5.274 33.624-14.365 31.572a48.46 48.46 0 01-31.554-16.776l-21.22-24.661z"
        fill="#ffb8b8"
      />
      <Path
        d="M648.209 806.707a19.217 19.217 0 01-16.939-25.376l4.384-12.86 3.328-32.444c5.126-10.46 12.385-8.895 20.797-.832 5.348-.525 6.496-5.872 5.824-13.31l16.864 22.702a13.534 13.534 0 011.45 13.685l-16.972 37.23a19.217 19.217 0 01-18.736 11.205zM860.682 656.581c-30.78 17.47-40.427 17.977-71.127 30.364l-26.62-14.974c-31.265 11.56-53.196-4.287-76.951-27.868 15.545-25.893 8.67-59.54 18.302-59.065l115.217 36.188 4.992 12.478z"
        fill="#2f2e41"
      />
      <Path
        d="M823.663 629.545c-40.682 17.609-84.486-1.035-121.873-42.011l-24.756-99.98a8.344 8.344 0 016.428-10.324l28.727-5.746 14.142 22.461 28.284-24.956 30.038 9.82a23.192 23.192 0 0115.634 18.02z"
        fill="#ffc633"
      />
      <Path
        d="M759.044 714.303a14.69 14.69 0 01-5.976-23.229l19.017-22.43 13.31 7.487-6.853 27.943a14.69 14.69 0 01-19.498 10.229z"
        opacity={0.2}
      />
      <Path
        d="M759.044 710.975a14.69 14.69 0 01-5.976-23.229l19.017-22.43 13.31 7.487-6.853 27.943a14.69 14.69 0 01-19.498 10.229z"
        fill="#ffb8b8"
      />
      <Path
        d="M788.723 679.458l-19.965-13.31 29.116-77.366-10.815-108.979 9.866 6.166a46.098 46.098 0 0120.726 29.828l15.995 77.976c-7 35.942-18.665 67.565-44.923 85.685z"
        fill="#ffc633"
      />
      <Path
        opacity={0.2}
        d="M776.661 555.922l9.983 49.914-8.211 29.192-1.772-79.106z"
      />
      <Path
        d="M699.521 430.217s-15.517-50.784 31.907-40.133c7.356 1.652 13.711 5.928 18.767 11.52a4.57 4.57 0 003.572 1.46c7.576 0 12.255 27.072-2.896 38.977 0 0 3.091-16.02-2.528-21.479a12.056 12.056 0 01-2.501-3.22c-3.658-7.378-15.953-9.8-24.432-9.172-4.33.32-4.708 7.869-9.5 6.814-10.904-2.398-14.385 10.233-12.389 15.233z"
        fill="#2f2e41"
      />
      <Path
        d="M747.254 505.59l-.313 2.3-1.938 14.187-3.174 23.235-.794 5.817a1.853 1.853 0 01-1.837 1.603h-21.163a1.854 1.854 0 01-1.836-1.599l-.809-5.821-3.227-23.235-1.972-14.198-.317-2.284a1.853 1.853 0 011.835-2.11h33.709a1.854 1.854 0 011.836 2.105z"
        fill="#e6e6e6"
      />
      <Path
        d="M713.943 497.33h29.351a1.854 1.854 0 011.854 1.854v2.449a1.854 1.854 0 01-1.854 1.853h-29.351a1.854 1.854 0 01-1.854-1.853v-2.45a1.854 1.854 0 011.854-1.853z"
        fill="#3f3d56"
      />
      <Path
        d="M749.906 506.564a196.19 196.19 0 01-42.575 0 1.853 1.853 0 01-1.854-1.853v-2.45a1.853 1.853 0 011.854-1.853 174.442 174.442 0 0042.575 0 1.853 1.853 0 011.853 1.854v2.449a1.853 1.853 0 01-1.853 1.853z"
        fill="#3f3d56"
      />
      <Circle cx={727.759} cy={527.008} r={8} fill="#fff" />
      <Path
        d="M748.326 543.839a14.69 14.69 0 01-18.042 15.804l-28.594-6.865.684-15.256 28.033-6.477a14.69 14.69 0 0117.919 12.794z"
        fill="#ffb8b8"
      />
      <Path
        d="M709.693 555.506l-77.169 1.929a19.167 19.167 0 01-19.453-21.872 19.167 19.167 0 015.88-11.286l36.334-33.99a48.519 48.519 0 0124.204-12.256l12.734-2.387 7.487 56.569-43.258-4.992 50.745 5.824z"
        fill="#ffc633"
      />
      <Path
        d="M608.03 721.501H411.023a6.606 6.606 0 01-6.606-6.606q107.123-12.45 210.219 0a6.606 6.606 0 01-6.606 6.606z"
        fill="#2f2e41"
      />
      <Path
        d="M614.636 715.284l-210.219-.389 24.364-40.994.116-.195V583.36a8.35 8.35 0 018.35-8.35H580.64a8.35 8.35 0 018.35 8.35v90.969z"
        fill="#3f3d56"
      />
      <Path
        d="M437.058 580.837a2.723 2.723 0 00-2.72 2.72v82.378a2.723 2.723 0 002.72 2.72h144.938a2.723 2.723 0 002.72-2.72v-82.378a2.723 2.723 0 00-2.72-2.72z"
        fill="#fff"
      />
      <Path
        d="M438.01 679.535a1.169 1.169 0 00-1.059.678l-7.507 16.32a1.166 1.166 0 001.059 1.654h157.872a1.166 1.166 0 001.042-1.688l-8.16-16.32a1.16 1.16 0 00-1.042-.644z"
        fill="#2f2e41"
      />
      <Circle cx={508.944} cy={577.728} r={1.749} fill="#fff" />
      <Path
        d="M493.426 701.295a1.168 1.168 0 00-1.125.863l-1.883 6.994a1.166 1.166 0 001.125 1.469h35.813a1.165 1.165 0 001.1-1.547l-2.42-6.995a1.166 1.166 0 00-1.102-.784zM588.99 672.346v1.555H428.781l.12-.195v-1.36H588.99z"
        fill="#2f2e41"
      />
      <Path
        d="M360.902 620.507a175.145 175.145 0 008.181 48.416c.114.363.233.722.353 1.085h30.533c-.033-.325-.066-.69-.098-1.085-2.036-23.405-13.774-165.85.26-190.21-1.226 1.975-41.597 67.427-39.23 141.794z"
        fill="#e6e6e6"
      />
      <Path
        d="M363.193 668.923c.255.363.52.727.792 1.085h22.905c-.173-.31-.374-.673-.608-1.085-3.784-6.83-14.984-27.249-25.38-48.416-11.173-22.748-21.423-46.358-20.56-54.904-.266 1.928-7.997 60.68 22.85 103.32z"
        fill="#e6e6e6"
      />
      <Path
        d="M414.853 175.159l12.413-9.928c-9.643-1.064-13.606 4.195-15.227 8.358-7.534-3.129-15.736.971-15.736.971l24.837 9.017a18.795 18.795 0 00-6.287-8.418zM788.737 124.054l12.413-9.929c-9.643-1.064-13.606 4.196-15.227 8.358-7.534-3.128-15.736.972-15.736.972l24.837 9.017a18.795 18.795 0 00-6.287-8.418zM717.256 255.809l12.413-9.929c-9.643-1.064-13.606 4.196-15.227 8.359-7.534-3.129-15.736.971-15.736.971l24.837 9.017a18.795 18.795 0 00-6.287-8.418z"
        fill="#3f3d56"
      />
      <Ellipse
        cx={320.013}
        cy={272.581}
        rx={112.082}
        ry={228.693}
        transform="rotate(-10.22 -5.987 979.58)"
        fill="#e6e6e6"
      />
      <Path
        d="M171.036 183.15q14.788 40.21 26.319 81.517 11.509 41.268 19.69 83.37 8.18 42.086 12.97 84.737 4.767 42.577 6.126 85.444 1.35 42.82-.746 85.657-.258 5.248-.569 10.494c-.21 3.582 5.362 3.57 5.572 0q2.526-42.972 1.585-86.05-.946-42.833-5.32-85.498-4.383-42.789-12.145-85.146-7.767-42.338-18.913-83.963-11.139-41.577-25.615-82.164-1.766-4.949-3.581-9.88c-1.228-3.337-6.615-1.895-5.373 1.481z"
        fill="#3f3d56"
      />
      <Path
        d="M209.428 288.604l24.684-54.809 6.958-15.448a2.871 2.871 0 00-1-3.812 2.808 2.808 0 00-3.811 1l-24.685 54.81-6.957 15.447a2.871 2.871 0 00.999 3.812 2.808 2.808 0 003.812-1zM214.882 326.055l-56.285-21.104-15.865-5.948a2.81 2.81 0 00-3.427 1.946 2.847 2.847 0 001.946 3.427l56.285 21.103 15.865 5.948a2.81 2.81 0 003.427-1.946 2.847 2.847 0 00-1.946-3.426z"
        fill="#3f3d56"
      />
      <Path d="M171.052 625s67.788-22.287 130.934 0" fill="#e6e6e6" />
      <Path
        d="M474.377 614.44c13.433-.14 26.865-.38 40.297-.562q6.717-.091 13.434-.16c3.859-.04 3.869-6.04 0-6-13.433.14-26.864.38-40.296.563q-6.717.09-13.435.16c-3.858.04-3.868 6.04 0 6zM474.377 628.44l54.29-.562 15.441-.16c3.859-.04 3.869-6.04 0-6l-54.29.563-15.44.16c-3.86.04-3.869 6.04 0 6zM474.377 642.44l54.29-.562 15.441-.16c3.859-.04 3.869-6.04 0-6l-54.29.563-15.44.16c-3.86.04-3.869 6.04 0 6z"
        fill="#ffc633"
      />
    </Svg>
  )
}
export default ImageEmptyList