Hello there!  
Thank you for contributing.

Before merging, please ensure that each modified or newly created block meets the following requirements:

**Concise List:**

##### 1. The block does one thing.
- For example, the `create_embed` block should only create an embed and not create a variable.

##### 2. The block has warnings for crucial inputs.
- For example, in the `get_user_by_id` block, the `id` field must include a warning, as it is crucial for the block to function as intended.

##### 3. Each block has maximum customizability.

##### 4. Inputs are error-proofed.
- **DO NOT CREATE INPUTS WHERE YOU CAN TYPE CODE** (with the exception of the insert JS block).
- Inputs should not cause errors, even when left empty.

##### 5. Consistent design patterns.
- Every block should be created in the same style.

##### 6. Clear and descriptive titles.

##### 7. Block modularity and reusability.
- Ensure that blocks can connect with each other in various scenarios. For example, if two blocks have the `user` type, they should be usable in all user inputs.

##### 8. Performance.

##### 9. Consider user feedback.

These rules will make app development easier, help eliminate pesky bugs, and simplify refactoring.

