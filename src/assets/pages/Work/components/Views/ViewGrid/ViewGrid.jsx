import React, { useState, useEffect, useMemo } from "react";
import { Stage, Container, Sprite } from "@pixi/react";
import { getFileSrc } from "assets/utils/getFileSrc";

import styles from "./ViewGrid.module.css";

export default function ViewGrid({ projects }) {
  let GridParent = () => {
    return (
      <div className={styles.gridParent}>
        <div className={styles.gridCel}></div>
        <div className={styles.titleContainer}>
          <span>www.enricogisana.com,</span> <span>www.gg-office.com,</span> <span>www.gg-rugs.com,</span>
          <span>www.the-apparel-garden.com,</span> <span>www.dirty-dms.com,</span> <span>www.bil-boe.com,</span>
          <span>www.times-new-variable.com,</span> <span>Diagonale’23</span>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}></div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}></div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}></div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}></div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
        </div>
        <div className={styles.gridCel}>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}></div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
            </div>
          </div>
          <div className={styles.gridCel}>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}></div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
            <div className={styles.gridCel}>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}></div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
              <div className={styles.gridCel}>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
                <div className={styles.gridCel}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const imageSources = [
      "/assets/media/p01.png",
      "/assets/media/p02.png",
      "/assets/media/p03.png",
      "/assets/media/p04.png",
      "/assets/media/p05.png",
      "/assets/media/p06.png",
      "/assets/media/p07.png",
      "/assets/media/p08.png",
      "/assets/media/p09.png",
      "",
      "",
    ];

    let gridCels = document.querySelectorAll(`.${styles.gridCel}`);

    gridCels.forEach((gridCel) => {
      // Pick a random background image for each gridCel
      const randomImage = imageSources[Math.floor(Math.random() * imageSources.length)];
      gridCel.style.backgroundImage = `url(${randomImage})`; // Apply the random image

      gridCel.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent the event from bubbling up
        const parent = gridCel.parentElement;
        const index = Array.from(parent.children).indexOf(gridCel) + 1;

        if (index === 1) {
          parent.style.gridTemplateColumns = "1fr 0fr";
          parent.style.gridTemplateRows = "1fr 0fr";
        } else if (index === 2) {
          parent.style.gridTemplateColumns = "0fr 1fr";
          parent.style.gridTemplateRows = "1fr 0fr";
        } else if (index === 3) {
          parent.style.gridTemplateColumns = "1fr 0fr";
          parent.style.gridTemplateRows = "0fr 1fr";
        } else if (index === 4) {
          parent.style.gridTemplateColumns = "0fr 1fr";
          parent.style.gridTemplateRows = "0fr 1fr";
        }

        const grandparent = parent.parentElement;
        const parentindex = Array.from(grandparent.children).indexOf(parent) + 1;

        if (parentindex === 1) {
          grandparent.style.gridTemplateColumns = "1fr 0fr";
          grandparent.style.gridTemplateRows = "1fr 0fr";
        } else if (parentindex === 2) {
          grandparent.style.gridTemplateColumns = "0fr 1fr";
          grandparent.style.gridTemplateRows = "1fr 0fr";
        } else if (parentindex === 3) {
          grandparent.style.gridTemplateColumns = "1fr 0fr";
          grandparent.style.gridTemplateRows = "0fr 1fr";
        } else if (parentindex === 4) {
          grandparent.style.gridTemplateColumns = "0fr 1fr";
          grandparent.style.gridTemplateRows = "0fr 1fr";
        }

        // const greatgrandparent = grandparent.parentElement;
        // const grandparentindex = Array.from(greatgrandparent.children).indexOf(parent) + 1;

        // if (grandparentindex === 1) {
        //   greatgrandparent.style.gridTemplateColumns = "1fr 0fr";
        //   greatgrandparent.style.gridTemplateRows = "1fr 0fr";
        // } else if (grandparentindex === 2) {
        //   greatgrandparent.style.gridTemplateColumns = "0fr 1fr";
        //   greatgrandparent.style.gridTemplateRows = "1fr 0fr";
        // } else if (grandparentindex === 3) {
        //   greatgrandparent.style.gridTemplateColumns = "1fr 0fr";
        //   greatgrandparent.style.gridTemplateRows = "0fr 1fr";
        // } else if (grandparentindex === 4) {
        //   greatgrandparent.style.gridTemplateColumns = "0fr 1fr";
        //   greatgrandparent.style.gridTemplateRows = "0fr 1fr";
        // }
      });
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <GridParent />
    </div>
  );
}
