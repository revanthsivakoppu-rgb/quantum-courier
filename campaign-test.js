'use strict';
const assert=require('node:assert/strict'),Q=require('./quantum.js'),L=require('./levels.js');
assert.equal(L.campaign.length,25);assert.equal(new Set(L.campaign.map(r=>r.title)).size,25);
function simulate(room,settings){const run={branches:[{weight:1,state:Q.states[room.start].slice()}],seen:[],scans:[],ops:0};const path=room.solutionPath;let previous=null;
 for(const p of path){assert.ok(room.tiles.includes(p.join(',')),'Solution left floor');if(previous)assert.equal(Math.abs(p[0]-previous[0])+Math.abs(p[1]-previous[1]),1,'Solution teleported');previous=p;const s=room.stations.find(s=>s.x===p[0]&&s.y===p[1]);if(!s)continue;const mode=settings?settings[s.id]??s.mode:s.solution??s.mode;assert.ok(s.choices.includes(mode));run.ops++;run.seen.push(s.id);if(s.type==='scan'){run.scans.push({id:s.id,basis:mode,certain:Q.certain(run.branches,mode)});run.branches=Q.ensembleMeasure(run.branches,mode);}else run.branches=Q.ensembleGate(run.branches,mode);}
 return {run,result:L.validate(room,run,Q)};
}
for(const [i,room] of L.campaign.entries()){
 assert.equal(new Set(room.stations.map(s=>`${s.x},${s.y}`)).size,room.stations.length,'Station overlap');assert.ok(room.stations.every(s=>room.tiles.includes(`${s.x},${s.y}`)));
 const {run,result}=simulate(room);assert.ok(result.valid,`${i+1} ${room.title}: ${result.detail}`);assert.ok(run.ops<=room.budget);assert.equal(L.validate(room,{...run,seen:[]},Q).valid,false,'Missing stations passed');assert.equal(L.validate(room,{...run,ops:room.budget+1},Q).valid,false,'Budget overrun passed');
 console.log(`PASS ${String(i+1).padStart(2,'0')} ${room.title} (${run.ops} operations, all branches)`);
}
// A destructive optional scan may not be bypassed by a lucky sampled result.
for(const i of [20,21]){const room=L.campaign[i];const direct={...room,solutionPath:L.pathFor('straight')};assert.equal(simulate(direct).result.valid,false,'Hazard route incorrectly passed');}
console.log('25 campaign solutions, contiguous routes, budgets, station coverage and hazard rejection passed.');

{const {run,result}=simulate(L.finale);assert.ok(result.valid,'Finale solution failed');assert.equal(run.ops,5);assert.equal(simulate({...L.finale,solutionPath:L.pathFor('straight')}).result.valid,false);assert.ok(L.finale.stations.every(s=>s.locked));console.log('PASS bonus finale: safe route wins, direct hazard route fails, stations fixed.');}
