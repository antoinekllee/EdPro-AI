import React, { useEffect, useRef } from "react";
import { Transformer } from "markmap-lib";
import { Markmap, loadCSS, loadJS } from "markmap-view";
import * as d3 from "d3";
import classes from "./MarkmapComponent.module.css";

const MarkmapComponent = ({ markdown, options }) => {
    const svgRef = useRef();
    const markmapInstanceRef = useRef(null);

    useEffect(() => {
        const transformer = new Transformer();
        const { root, features } = transformer.transform(markdown);
        const { styles, scripts } = transformer.getUsedAssets(features);

        if (styles) loadCSS(styles);
        if (scripts) loadJS(scripts, { getMarkmap: () => Markmap });

        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove();
        if (!markmapInstanceRef.current) {
            markmapInstanceRef.current = Markmap.create(svgEl, options, root);
        } else {
            markmapInstanceRef.current.setData(root, options);
        }
    }, [markdown, options]);

    const zoomIn = () => {
        if (markmapInstanceRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(300) // Duration of the transition in milliseconds
                .call(markmapInstanceRef.current.zoom.scaleBy, 1.2);
        }
    };

    const zoomOut = () => {
        if (markmapInstanceRef.current) {
            d3.select(svgRef.current)
                .transition()
                .duration(300) // Duration of the transition in milliseconds
                .call(markmapInstanceRef.current.zoom.scaleBy, 0.8);
        }
    };

    //   const toggleFullscreen = () => {
    //     const elem = document.documentElement;
    //     if (!document.fullscreenElement) {
    //       if (elem.requestFullscreen) {
    //         elem.requestFullscreen();
    //       }
    //     } else {
    //       if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //       }
    //     }
    //   };

    return (
        <>
            <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
            <div className={classes.buttonGroup}>
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
                {/* <button onClick={toggleFullscreen}>Fullscreen</button> */}
            </div>
        </>
    );
};

export default MarkmapComponent;
