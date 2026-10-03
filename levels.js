/* Hand-authored campaign. Solution settings are also used by the solvability audit. */
(function(root){
 const G=(solution,choices=['H','X','Z'])=>({type:'gate',solution,choices,mode:choices.find(v=>v!==solution)||solution});
 const M=(solution,choices=['Z','X'])=>({type:'scan',solution,choices,mode:choices.find(v=>v!==solution)||solution});
 const F=g=>G(g,[g]);
 const names={'Z+':'Z-up','Z-':'Z-down','X+':'X-plus','X-':'X-minus'};
 const chapters=['First transformations','Choose your question','Signs and interference','Repair the circuit','Courier certification'];
 const definitions=[
  ['Flip the delivery','Z+','Z-',[G('X')],'An X gate swaps Z-up and Z-down.'],
  ['A different certainty','Z+','X+',[G('H')],'H turns Z-up into a state with a certain X-plus reading.'],
  ['The other entrance','Z-','X-',[G('H')],'The starting state matters: H sends Z-down to X-minus.'],
  ['Change the sign','X+','X-',[G('Z')],'Z changes the relative sign and swaps X-plus with X-minus.'],
  ['An invisible flip','X-','X-',[G('X',['H','X'])],'X changes the overall sign of X-minus. An overall sign cannot change a measurement result.'],
  ['Ask the right question','X+','X+',[M('X')],'An X scanner preserves X-plus. A Z scanner would disturb this certainty.'],
  ['Prepare, then inspect','Z+','X+',[G('H'),M('X')],'First prepare X-plus using H; then measure it in the matching basis.'],
  ['Flip, then inspect','Z+','Z-',[G('X'),M('Z')],'A Z measurement preserves a prepared Z-down state.'],
  ['Same question twice','Z+',null,[M('X',['X']),M('X')],'The first X scan is random. A second X scan repeats whichever answer occurred.',{echo:true}],
  ['Back to the familiar','X+','Z+',[G('H'),M('Z')],'H changes an X eigenstate into a Z eigenstate, which a Z scanner can read reliably.'],
  ['There and back','Z+','Z+',[F('H'),G('H')],'Two H gates undo one another. Superposition is not permanent randomness.'],
  ['Phase becomes a flip','Z+','Z-',[F('H'),G('Z',['H','Z']),F('H')],'H → Z → H uses interference to turn a phase change into a bit flip.'],
  ['The mirror circuit','X+','X-',[F('H'),G('X',['X','Z']),F('H')],'H → X → H acts like Z: it flips an X state.'],
  ['No phase to compare','Z-','Z+',[F('Z'),G('X',['H','X'])],'Z on Z-down changes only the overall sign. X still flips it into Z-up.'],
  ['Cancel the disturbance','X+','X+',[F('Z'),G('Z',['H','Z'])],'Two phase flips cancel. The relative sign returns to where it started.'],
  ['Safe checkpoint','Z+','X-',[F('H'),M('X'),G('Z')],'Measure in the prepared basis, then use Z to change the X state.'],
  ['Read after interference','Z+','Z-',[F('H'),G('Z',['H','Z']),F('H'),M('Z')],'Finish interference before reading. The correct final scan preserves Z-down.'],
  ['Round-trip inspection','Z-','Z-',[F('H'),M('X'),G('H')],'A matching X scan between H gates preserves the information needed to return.'],
  ['A sign at the entrance','X-','Z+',[G('Z',['H','Z']),G('H'),M('Z')],'Turn X-minus into X-plus before rotating it to Z-up.'],
  ['Between two mirrors','X+','X-',[F('H'),M('Z'),G('X'),F('H')],'A Z checkpoint is safe between these transformations. Order determines the final state.'],
  ['Take the quiet route','X+','X+',[M('X',['X'])],'Avoid the optional Z scanner. Inspecting in the wrong basis destroys X certainty.',{hazard:'Z'}],
  ['Protect the interference','Z+','Z-',[F('H'),F('Z'),F('H')],'Walk around the optional Z scanner while the key is in an X state. Then finish the interference.',{hazard:'Z'}],
  ['A reliable return','Z+','Z+',[F('X'),F('H'),M('X'),F('H'),G('X',['X','Z'])],'Prepare, read in the matching basis, and undo the preparation in reverse order.'],
  ['Read, change, read','Z+',null,[M('X',['X']),F('H'),M('Z')],'H maps either X outcome to a Z eigenstate. The last Z scan is certain even though the first X scan was random.',{echo:true}],
  ['The final dispatch','Z+','Z-',[F('H'),M('X'),G('Z',['H','Z']),F('H'),M('Z')],'Preserve superposition with the right scan, change the relative sign, recombine, then read the certain result.']
 ];
 function pathFor(layout){const path=[[1,3]];const go=(x,y)=>{let [a,b]=path[path.length-1];while(a!==x||b!==y){if(a!==x)a+=Math.sign(x-a);else b+=Math.sign(y-b);path.push([a,b]);}};
 if(layout==='upper'){go(2,3);go(2,1);go(8,1);go(8,3);go(9,3);}
 else if(layout==='lower'){go(2,3);go(2,5);go(8,5);go(8,3);go(9,3);}
 else if(layout==='weave'){go(2,3);go(2,1);go(4,1);go(4,5);go(6,5);go(6,1);go(8,1);go(8,3);go(9,3);}
 else go(9,3);return path;}
 const campaign=definitions.map((d,index)=>{const [title,start,target,specs,lesson,extra={}]=d;const layout=extra.hazard?'straight':['straight','upper','lower','weave'][Math.floor(index/3)%4];const path=pathFor(layout);const stations=specs.map((s,i)=>{const slot=Math.floor((i+1)*(path.length-1)/(specs.length+1));const [x,y]=path[slot];return {...s,id:String.fromCharCode(65+i),x,y};});let tiles=path.map(p=>p.join(',')),solutionPath=path;
 if(extra.hazard){const hx=4;stations.push({id:'!',x:hx,y:3,type:'scan',mode:extra.hazard,choices:[extra.hazard],optional:true,locked:true});for(let x=hx-1;x<=hx+1;x++)tiles.push(`${x},2`);solutionPath=[];for(const p of path){if(p[0]===hx&&p[1]===3)solutionPath.push([hx-1,2],[hx,2],[hx+1,2]);else solutionPath.push(p);}}
 const count=specs.length;return {title,short:title,chapter:chapters[Math.floor(index/5)],start,target,echo:!!extra.echo,stations,tiles,solutionPath,budget:count,lesson,goal:extra.echo?'Make the final scan certain':`Deliver ${names[target]}, every time`,note:`Start: ${names[start]} · Use every lettered station · ${count} operation${count===1?'':'s'} max`,brief:extra.hazard?'A red optional scanner blocks the direct route. Find a path that protects the key. Lettered stations are required.':extra.echo?'Either first result is allowed. Arrange the equipment so the final scan is certain for every possible first reading.':`Your key starts ${names[start]}. Configure the stations and reach the gold pad with ${names[target]} guaranteed.`,hint:`${extra.hazard?'Use the upper detour to avoid !. ':''}Set ${specs.map((s,i)=>`${String.fromCharCode(65+i)} to ${s.solution}${s.type==='scan'?' scan':' gate'}`).join(', ')}. ${lesson}`,floor:layout};});
 function validate(room,run,Q){const required=room.stations.filter(s=>!s.optional);if(!required.every(s=>run.seen.includes(s.id)))return {valid:false,detail:'Visit every lettered station before delivering. The ! scanner is optional.'};if(room.budget&&run.ops>room.budget)return {valid:false,detail:`Use no more than ${room.budget} operations. Undo or reset the room.`};if(room.echo){const last=run.scans.at(-1);const valid=run.scans.length>=2&&!!last?.certain;return {valid,detail:'The final scan must be certain for every earlier measurement outcome. Match its basis to the arriving state.'};}const p=Q.fidelity(run.branches,Q.states[room.target]);return {valid:p>1-1e-9,detail:`This route delivers ${names[room.target]} with ${Math.round(p*100)}% reliability. You need 100%. Inspect the replay and try another setting or route.`};}

 const finale={...campaign[24],title:'The last quantum key',short:'The last quantum key',chapter:'Finale',start:'Z-',target:'Z+',goal:'Deliver Z-up with certainty',note:'Start: Z-down · All five stations · 5 operations max',brief:'One final delivery. Choose the safe measurement bases, use interference, and take the detour around the red scanner. Stations cannot be moved.',lesson:'You started with Z-down. H prepared X-minus, and the matching X scan preserved it. Z changed X-minus into X-plus. The last H produced Z-up, and the final Z scan confirmed it. Avoiding the extra Z scanner protected the interference.',hint:'Set A to H, B to X scan, C to Z, D to H, E to Z scan. After B, go up, right, right, then down to avoid the red ! scanner. Finish by walking right.',stations:campaign[24].stations.map(v=>({...v,choices:[...v.choices],locked:true})),tiles:[...campaign[24].tiles,'3,2','4,2','5,2'],solutionPath:[[1,3],[2,3],[3,3],[3,2],[4,2],[5,2],[5,3],[6,3],[7,3],[8,3],[9,3]]};
 finale.stations.push({id:'!',x:4,y:3,type:'scan',mode:'Z',choices:['Z'],optional:true,locked:true});
 const api={campaign,finale,pathFor,validate,names};if(typeof module!=='undefined')module.exports=api;else root.Levels=api;
})(typeof window!=='undefined'?window:globalThis);
