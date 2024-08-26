## Pull Request Checklist

Hello there!  
Thank you for contributing to our project. Before merging your pull request, please ensure that each modified or newly created block meets the following requirements:

**Concise List:**

##### 1. The block does one thing
- **Example:** The `create_embed` block should only create an embed and not handle other functionalities like creating a variable.

##### 2. The block has warnings for crucial inputs
- **Example:** In the `get_user_by_id` block, the `id` field must include a warning, as it is essential for the block's functionality.

##### 3. Each block has maximum customizability
- Ensure that each block can be customized to fit different needs without significant modifications.

##### 4. Inputs are error-proofed
- **Note:** **DO NOT CREATE INPUTS WHERE YOU CAN TYPE CODE** (except for the insert JS block).
- Inputs should be designed to prevent errors, even when left empty.

##### 5. Consistent design patterns
- Every block should follow the same design style to maintain uniformity across the project.

##### 6. Clear and descriptive titles
- Ensure that titles are meaningful and provide clear information about the block’s purpose.

##### 7. Block modularity and reusability
- Blocks should be modular and reusable, allowing them to connect with each other in various scenarios. For instance, blocks with the `user` type should be compatible with all user-related inputs.

##### 8. Performance
- Assess and ensure that the blocks perform efficiently and do not introduce unnecessary overhead.

##### 9. Consider user feedback
- Incorporate feedback from users to improve the functionality and usability of the blocks.

---

**Additional Notes:**

Please add any additional context or information that might be relevant to the review of this pull request. 

**Checklist:**

- [ ] All blocks meet the one-function requirement.
- [ ] Warnings for crucial inputs are included.
- [ ] Blocks are customizable.
- [ ] Inputs are error-proofed.
- [ ] Design patterns are consistent.
- [ ] Titles are clear and descriptive.
- [ ] Blocks are modular and reusable.
- [ ] Performance has been considered.
- [ ] User feedback has been addressed.

These guidelines will help make development easier, reduce bugs, and simplify future refactoring.

