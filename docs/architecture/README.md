# Architecture Decision Records
ADRs are the preemptive answers to future contributors asking "why did they implement it this way?"

It's impossible to predict what those questions will be, but, roughly speaking, decisions are worth documenting if:
* it *required* a whiteboard to reach consensus among the initial contributors
* it has needed to be revisited since it was initially decided

## Format
The format below is based on [a blog post](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions) by Michael Nygard.

### Title 
A short noun phrase. 

For example, "ADR 1: Deployment on Ruby on Rails 3.0.10" or "ADR 9: LDAP for Multitenant Integration"

### Context 
This section describes the forces at play, including technological, political, social, and project local. These forces are probably in tension, and should be called out as such. The language in this section is value-neutral. It is simply describing facts.

### Decision 
This section describes our response to these forces. It is stated in full sentences, with active voice. "We will ..."

### Status 
A decision may be "proposed" if the project stakeholders haven't agreed with it yet, or "accepted" once it is agreed. If a later ADR changes or reverses a decision, it may be marked as "deprecated" or "superseded" with a reference to its replacement.

### Consequences 
This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.
