// // Purity: Components as formulas
// // https://react.dev/learn/keeping-components-pure#purity-components-as-formulas

// function Recipe({ drinkers }) {
//   return (
//     <ol>    
//       <li>Boil {drinkers} cups of water.</li>
//       <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
//       <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
//     </ol>
//   );
// }

// export default function App() {
//   return (
//     <section>
//       <h1>Spiced Chai Recipe</h1>
//       <h2>For two</h2>
//       <Recipe drinkers={2} />
//       <h2>For a gathering</h2>
//       <Recipe drinkers={4} />
//     </section>
//   );
// }

// // Side Effects: (un)intended consequences
// // https://react.dev/learn/keeping-components-pure#side-effects-unintended-consequences

// // let guest = 0;

// // function Cup() {
// //   // Bad: changing a preexisting variable!
// //   guest = guest + 1;
// //   return <h2>Tea cup for guest #{guest}</h2>;
// // }

// // export default function TeaSet() {
// //   return (
// //     <>
// //       <Cup />
// //       <Cup />
// //       <Cup />
// //     </>
// //   );
// // }

// function Cup({ guest }) {
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaSet() {
//   return (
//     <>
//       <Cup guest={1} />
//       <Cup guest={2} />
//       <Cup guest={3} />
//     </>
//   );
// }


// Local mutation: Your component’s little secret
// https://react.dev/learn/keeping-components-pure#local-mutation-your-components-little-secret

function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
